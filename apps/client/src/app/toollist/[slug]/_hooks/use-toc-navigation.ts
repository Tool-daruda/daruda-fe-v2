"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TOC_ITEMS } from "../_constants/toc";
import {
	getSectionScrollTop,
	getVisibleSectionId,
	prefersReducedMotion,
} from "../_utils/toc-scroll";

/** 섹션을 상단에 맞출 때 남기는 여백. 사이드바의 sticky top과 통일 */
const SCROLL_OFFSET = 24;
/** 마지막 섹션 기준점:이 선을 지난 마지막 섹션이 활성화 */
const ACTIVE_LINE = SCROLL_OFFSET + 8;
/** 스크롤 위치의 미세한 흔들림을 사용자 조작으로 오인하지 않기 위한 여유값 */
const PIN_TOLERANCE = 4;

/**
 * 목차의 활성 항목을 스크롤 위치에 맞춰 갱신
 * 목차로 이동한 뒤에는 사용자가 직접 스크롤하기 전까지 선택한 항목을 유지
 */
export const useTocNavigation = () => {
	const [activeId, setActiveId] = useState<string>(TOC_ITEMS[0].id);
	const pinnedTopRef = useRef<number | null>(null);
	const pinnedDistanceRef = useRef(Number.POSITIVE_INFINITY);

	useEffect(() => {
		let frameId = 0;

		const syncActiveId = () => {
			const visibleId = getVisibleSectionId(ACTIVE_LINE);
			if (!visibleId) return;

			setActiveId((prev) => (prev === visibleId ? prev : visibleId));
		};

		/** 목적지에 머무는 동안 true, 사용자가 벗어나면 false */
		const keepsPinnedPosition = () => {
			const pinnedTop = pinnedTopRef.current;
			if (pinnedTop === null) return false;

			const distance = Math.abs(window.scrollY - pinnedTop);

			if (distance <= pinnedDistanceRef.current + PIN_TOLERANCE) {
				pinnedDistanceRef.current = Math.min(distance, pinnedDistanceRef.current);
				return true;
			}

			pinnedTopRef.current = null;
			return false;
		};

		const handleScroll = () => {
			if (keepsPinnedPosition()) return;
			if (frameId) return;

			frameId = requestAnimationFrame(() => {
				frameId = 0;
				syncActiveId();
			});
		};

		syncActiveId();

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll, { passive: true });

		const resizeObserver = new ResizeObserver(handleScroll);
		resizeObserver.observe(document.body);

		return () => {
			if (frameId) cancelAnimationFrame(frameId);
			resizeObserver.disconnect();
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

	const scrollToSection = useCallback((id: string) => {
		const section = document.getElementById(id);
		if (!section) return;

		const top = getSectionScrollTop(section, SCROLL_OFFSET);

		pinnedTopRef.current = top;
		pinnedDistanceRef.current = Math.abs(window.scrollY - top);
		setActiveId(id);

		window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
	}, []);

	return { activeId, scrollToSection };
};
