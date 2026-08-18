"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { type ConfirmOptions, confirm } from "@/common/components/modal";

/**
 * 저장하지 않은 변경이 있을 때 페이지 이탈을 막고 확인 모달을 띄운다.
 *
 * App Router에는 라우터 전역을 가로채는 API가 없어서(Link의 onNavigate는 Link마다 달아야 한다)
 * 링크 클릭을 캡처 단계에서 가로챈다. 새로고침·탭 닫기·외부 링크는 브라우저 기본 경고(beforeunload)에 맡긴다.
 * 브라우저 뒤로가기는 App Router에서 안전하게 막을 방법이 없어 가드하지 않는다.
 */
export const useNavigationGuard = (enabled: boolean, options: ConfirmOptions) => {
	const router = useRouter();
	// 매 렌더 새 객체로 들어와도 리스너를 다시 붙이지 않도록 ref에 담아둔다.
	const optionsRef = useRef(options);
	optionsRef.current = options;

	useEffect(() => {
		if (!enabled) return;

		const handleBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();

		const handleClick = (e: MouseEvent) => {
			// 새 탭으로 열기(수식키·가운데 버튼)는 페이지를 떠나지 않으므로 그대로 둔다.
			if (e.defaultPrevented || e.button !== 0) return;
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

			const anchor = (e.target as Element | null)?.closest?.("a[href]");
			if (!(anchor instanceof HTMLAnchorElement)) return;
			if (anchor.hasAttribute("download")) return;
			if (anchor.target && anchor.target !== "_self") return;
			// 외부 링크는 beforeunload가 처리한다.
			if (anchor.origin !== window.location.origin) return;

			// 해시 점프처럼 같은 문서 안에서 움직이는 이동은 페이지를 벗어나지 않는다.
			if (
				anchor.pathname === window.location.pathname &&
				anchor.search === window.location.search
			) {
				return;
			}

			const href = `${anchor.pathname}${anchor.search}${anchor.hash}`;

			e.preventDefault();
			e.stopPropagation();

			void confirm(optionsRef.current).then((confirmed) => {
				if (confirmed) router.push(href);
			});
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		document.addEventListener("click", handleClick, true);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
			document.removeEventListener("click", handleClick, true);
		};
	}, [enabled, router]);
};
