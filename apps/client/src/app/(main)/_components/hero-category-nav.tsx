import Link from "next/link";
import { ToolApi } from "@/common/api/tool-api";
import { Skeleton } from "@/common/components/skeleton/skeleton";
import * as s from "./hero-section.css";

// 칩 폭이 제각각이라 대표적인 너비를 섞어 실제 줄바꿈에 가깝게 맞춥니다.
const CHIP_WIDTHS = [
	"52px",
	"76px",
	"64px",
	"88px",
	"58px",
	"70px",
	"82px",
	"60px",
	"74px",
	"66px",
];

export const HeroCategoryNavSkeleton = () => (
	<div className={s.categorySection}>
		<div className={s.categoryList}>
			{CHIP_WIDTHS.map((width) => (
				<Skeleton key={width} width={width} height="24px" radius="39px" />
			))}
		</div>
	</div>
);

export const HeroCategoryNav = async () => {
	const categories = (await ToolApi.getCategories().catch(() => null)) || [];

	return (
		<div className={s.categorySection}>
			<nav className={s.categoryList}>
				{categories.map((category) => (
					<Link
						key={category.name}
						href={category.name === "ALL" ? "/toollist" : `/toollist?category=${category.name}`}
						className={category.name === "ALL" ? s.categoryChipActive : s.categoryChip}
					>
						{category.koreanName}
					</Link>
				))}
			</nav>
		</div>
	);
};
