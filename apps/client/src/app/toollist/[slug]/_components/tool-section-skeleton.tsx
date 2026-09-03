import { Skeleton } from "@/common/components/skeleton/skeleton";
import * as styles from "./styles/tool-section-skeleton.css";

type Props = {
	bodyHeight: string;
	cards?: number;
};

// 섹션이 다 `제목 + 본문`이라 제목 줄을 따로 그려야 밀림이 적습니다.
// 본문 높이는 API 결과에 따라 달라져서 흔한 크기로 근사만 합니다.
export const ToolSectionSkeleton = ({ bodyHeight, cards }: Props) => (
	<div className={styles.container}>
		<Skeleton width="180px" height="28px" />

		{cards ? (
			<div className={styles.grid}>
				{Array.from({ length: cards }, (_, i) => `card-${i}`).map((slot) => (
					<Skeleton key={slot} height={bodyHeight} radius="12px" />
				))}
			</div>
		) : (
			<Skeleton height={bodyHeight} radius="12px" />
		)}
	</div>
);
