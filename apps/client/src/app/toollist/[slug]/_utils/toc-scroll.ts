import { TOC_ITEMS } from "../_constants/toc";

/** 목차에 대응하는 섹션 중 실제로 렌더링된 것만 문서 순서대로 반환 */
const getRenderedSections = () => {
	return TOC_ITEMS.map((item) => document.getElementById(item.id)).filter(
		(section): section is HTMLElement => section !== null
	);
};

/**
 * 기준선을 지난 마지막 섹션이 지금 보고 있는 섹션
 * 아직 아무 섹션도 기준선을 지나지 않았다면 첫 섹션
 */
export const getVisibleSectionId = (activeLine: number) => {
	const sections = getRenderedSections();
	if (sections.length === 0) return null;

	const passed = sections.filter((section) => section.getBoundingClientRect().top <= activeLine);

	return (passed.at(-1) ?? sections[0]).id;
};

/**
 * 섹션을 상단에 맞추기 위한 스크롤 위치
 * 문서 끝에서는 요청한 위치까지 갈 수 없으므로 실제로 멈추게 될 위치로 보정
 */
export const getSectionScrollTop = (section: HTMLElement, offset: number) => {
	const maxTop = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
	const top = section.getBoundingClientRect().top + window.scrollY - offset;

	return Math.min(Math.max(top, 0), maxTop);
};

export const prefersReducedMotion = () => {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
