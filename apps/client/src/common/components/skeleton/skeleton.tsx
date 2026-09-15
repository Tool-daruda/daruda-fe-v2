import type { CSSProperties } from "react";
import { cx } from "@/common/utils";
import * as s from "./skeleton.css";

type Props = {
	width?: string;
	height?: string;
	radius?: string;
	/** 브레이크포인트마다 크기가 달라야 할 때 쓴다. height prop보다 우선한다. */
	className?: string;
};

/**
 * @description 로딩 중 자리를 차지하는 회색 블록입니다.
 * @note 실제 콘텐츠와 같은 크기를 넘겨야 스트리밍 중 화면이 밀리지 않습니다.
 */
export const Skeleton = ({ width = "100%", height, radius = "8px", className }: Props) => {
	const style: CSSProperties = { width, height, borderRadius: radius };

	return <div aria-hidden className={cx(s.skeleton, className)} style={style} />;
};
