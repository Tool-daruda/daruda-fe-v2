import type { CSSProperties } from "react";
import * as s from "./skeleton.css";

type Props = {
	width?: string;
	height?: string;
	radius?: string;
};

/**
 * @description 로딩 중 자리를 차지하는 회색 블록입니다.
 * @note 실제 콘텐츠와 같은 크기를 넘겨야 스트리밍 중 화면이 밀리지 않습니다.
 */
export const Skeleton = ({ width = "100%", height, radius = "8px" }: Props) => {
	const style: CSSProperties = { width, height, borderRadius: radius };

	return <div aria-hidden className={s.skeleton} style={style} />;
};
