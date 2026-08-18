"use client";

import { useEffect } from "react";

const SCROLL_KEYS = new Set([
	" ",
	"PageUp",
	"PageDown",
	"Home",
	"End",
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
]);

const isTypingTarget = (target: EventTarget | null) => {
	if (!(target instanceof HTMLElement)) return false;
	return target.isContentEditable || !!target.closest("input, textarea, select");
};

/**
 * 페이지 스크롤을 잠급니다.
 *
 * body에 overflow: hidden을 주면 스크롤바가 사라지면서 콘텐츠 폭이 넓어져 화면이 튀기 때문에,
 * 스크롤바는 그대로 둔 채 스크롤을 일으키는 입력(휠/터치/키보드)만 막습니다.
 * 스크롤바 드래그처럼 막지 못한 경로로 스크롤이 발생하면 원래 위치로 되돌립니다.
 */
export const useScrollLock = (locked: boolean) => {
	useEffect(() => {
		if (!locked) return;

		const { scrollX, scrollY } = window;

		const preventScroll = (e: Event) => e.preventDefault();

		const handleKeyDown = (e: KeyboardEvent) => {
			if (isTypingTarget(e.target)) return;
			if (SCROLL_KEYS.has(e.key)) e.preventDefault();
		};

		const restoreScroll = () => window.scrollTo(scrollX, scrollY);

		window.addEventListener("wheel", preventScroll, { passive: false });
		window.addEventListener("touchmove", preventScroll, { passive: false });
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("scroll", restoreScroll);

		return () => {
			window.removeEventListener("wheel", preventScroll);
			window.removeEventListener("touchmove", preventScroll);
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("scroll", restoreScroll);
		};
	}, [locked]);
};
