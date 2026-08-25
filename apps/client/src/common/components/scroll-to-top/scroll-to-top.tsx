"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * @description 라우트가 바뀌면 페이지 최상단으로 이동시킨다.
 * 뒤로/앞으로 가기(popstate)는 브라우저·Next.js가 스크롤을 복원하므로 건드리지 않는다.
 */
export default function ScrollToTop() {
	const pathname = usePathname();
	const isPopNavigationRef = useRef(false);

	useEffect(() => {
		const markPopNavigation = () => {
			isPopNavigationRef.current = true;
		};

		window.addEventListener("popstate", markPopNavigation);
		return () => window.removeEventListener("popstate", markPopNavigation);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: 'pathname은 값이 아니라 라우트 변경 트리거로 쓴다.'
	useEffect(() => {
		if (isPopNavigationRef.current) {
			isPopNavigationRef.current = false;
			return;
		}

		// 해시로 진입한 경우 해당 위치로 이동해야 하므로 건드리지 않는다.
		if (window.location.hash) return;

		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	}, [pathname]);

	return null;
}
