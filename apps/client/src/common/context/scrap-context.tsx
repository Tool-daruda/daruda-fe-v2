"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useIsLoggedIn } from "./auth-context";

interface ScrappedTools {
	ids: Set<number>;
	setScrapped: (toolId: number, next: boolean) => void;
}

const EMPTY: ScrappedTools = { ids: new Set(), setScrapped: () => {} };

const ScrappedToolsContext = createContext<ScrappedTools>(EMPTY);

const fetchScrappedIds = () =>
	fetch("/api/scrap-tools")
		.then((res) => (res.ok ? res.json() : { toolIds: [] }))
		.then((body: { toolIds?: number[] }) => body.toolIds ?? [])
		.catch((): number[] => []);

/**
 * @description 찜한 툴 ID를 브라우저에서 조회합니다.
 * 서버에서 받으면 scrap-tools의 200ms만큼 RSC 스트림이 붙잡힙니다.
 */
export const ScrappedToolsProvider = ({
	initialIds,
	children,
}: {
	/** 스토리북처럼 네트워크가 없는 환경에서 값을 고정합니다. */
	initialIds?: number[];
	children: React.ReactNode;
}) => {
	const isLoggedIn = useIsLoggedIn();
	const [ids, setIds] = useState<Set<number>>(() => new Set(initialIds));

	// 라우트를 옮겨다녀도 한 세션에 한 번만 부르도록 프로미스를 붙들어 둡니다.
	// 모듈 전역에 두면 SSR 때 서버에서도 평가돼 사용자끼리 공유됩니다.
	const pendingRequest = useRef<Promise<number[]> | null>(null);

	// 배열을 그대로 의존성에 넣으면 인라인 리터럴마다 effect가 다시 돕니다.
	const isFixed = initialIds !== undefined;

	useEffect(() => {
		if (isFixed) return;

		if (!isLoggedIn) {
			// 다음 로그인이 새로 받도록 붙들어둔 프로미스까지 버립니다.
			pendingRequest.current = null;
			setIds((prev) => (prev.size === 0 ? prev : new Set()));
			return;
		}

		pendingRequest.current ??= fetchScrappedIds();

		let alive = true;
		pendingRequest.current.then((loaded) => {
			if (alive) setIds(new Set(loaded));
		});

		return () => {
			alive = false;
		};
	}, [isFixed, isLoggedIn]);

	const setScrapped = useCallback((toolId: number, next: boolean) => {
		setIds((prev) => {
			const updated = new Set(prev);
			if (next) updated.add(toolId);
			else updated.delete(toolId);
			return updated;
		});
	}, []);

	const value = useMemo(() => ({ ids, setScrapped }), [ids, setScrapped]);

	return <ScrappedToolsContext.Provider value={value}>{children}</ScrappedToolsContext.Provider>;
};

export const useScrappedTools = () => useContext(ScrappedToolsContext);
