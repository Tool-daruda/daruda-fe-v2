import { Skeleton } from "@/common/components/skeleton/skeleton";
import * as styles from "./styles/tool-section-skeleton.css";

type Props = {
	/** 본문 자리 높이. 섹션마다 실제 콘텐츠에 가깝게 넘깁니다. */
	bodyHeight: string;
	/** 2열 그리드로 그릴 카드 수. 없으면 단일 블록입니다. */
	cards?: number;
};

const CARD_SLOTS = ["1", "2", "3", "4", "5", "6"];

/**
 * @description 툴 상세 섹션의 로딩 자리를 채웁니다.
 * @note 섹션은 모두 `제목 + 본문` 구조라 제목 줄을 따로 그려야 스트리밍 완료 시 밀림이 적습니다.
 * 본문 높이는 API 결과에 따라 달라져 정확히 맞출 수 없고, 흔한 크기로 근사합니다.
 */
export const ToolSectionSkeleton = ({ bodyHeight, cards }: Props) => (
	<div className={styles.container}>
		<Skeleton width="180px" height="28px" />

		{cards ? (
			<div className={styles.grid}>
				{CARD_SLOTS.slice(0, cards).map((slot) => (
					<Skeleton key={slot} height={bodyHeight} radius="12px" />
				))}
			</div>
		) : (
			<Skeleton height={bodyHeight} radius="12px" />
		)}
	</div>
);
