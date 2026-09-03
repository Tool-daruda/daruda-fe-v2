import { ToolApi } from "@/common/api/tool-api";
import { Skeleton } from "@/common/components/skeleton/skeleton";
import { SidebarWrapper } from "./sidebar-wrapper";
import { ToolListGrid } from "./tool-list-grid";
import * as s from "./toollist.css";

const CARD_SLOTS = Array.from({ length: 18 }, (_, i) => `card-${i}`);

type Props = {
	currentCategory: string;
	currentCriteria: string;
	isFree: boolean;
};

export const ToolListContentSkeleton = () => (
	<div className={s.mainLayout}>
		<div className={s.sidebarColumn}>
			<Skeleton height="420px" radius="12px" />
		</div>
		<section className={s.content}>
			<div className={s.grid}>
				{CARD_SLOTS.map((slot) => (
					<Skeleton key={slot} height="150px" radius="16px" />
				))}
			</div>
		</section>
	</div>
);

export const ToolListContent = async ({ currentCategory, currentCriteria, isFree }: Props) => {
	const [categoriesRes, initialToolsRes] = await Promise.all([
		ToolApi.getCategories(),
		// 검색 결과가 0건이면 백엔드가 200 대신 404를 내려주므로, 빈 목록으로 취급한다.
		ToolApi.getToolList({
			category: currentCategory,
			criteria: currentCriteria,
			isFree: isFree,
		}).catch(() => null),
	]);

	const categories = categoriesRes || [];
	const toolList = initialToolsRes?.tools || [];
	const pagination = initialToolsRes?.scrollPaginationDto;

	return (
		<div className={s.mainLayout}>
			<SidebarWrapper categories={categories} currentCategory={currentCategory} />

			<section className={s.content}>
				{/*
				 * 필터가 바뀌면 key가 바뀌어 인스턴스가 새로 만들어지고 누적분이 버려진다.
				 * 반대로 찜하기 등의 재검증(updateTag)으로 이 페이지만 다시 렌더될 때는
				 * key가 같아 스크롤로 쌓아둔 목록이 유지된다.
				 */}
				<ToolListGrid
					key={`${currentCategory}-${currentCriteria}-${isFree}`}
					initialTools={toolList}
					initialNextCursor={pagination?.nextCursor ?? null}
					totalElements={pagination?.totalElements ?? toolList.length}
					category={currentCategory}
					criteria={currentCriteria}
					isFree={isFree}
				/>
			</section>
		</div>
	);
};
