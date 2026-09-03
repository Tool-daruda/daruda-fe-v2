"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useIsLoggedIn } from "./auth-context";

interface ScrappedTools {
	ids: Set<number>;
	setScrapped: (toolId: number, next: boolean) => void;
}

const EMPTY: ScrappedTools = { ids: new Set(), setScrapped: () => {} };

const ScrappedToolsContext = createContext<ScrappedTools>(EMPTY);

// 라우트를 옮겨다녀도 한 세션에 한 번만 부르도록 프로미스를 붙들어 둡니다.
let pendingRequest: Promise<number[]> | null = null;

const loadScrappedIds = () => {
	pendingRequest ??= fetch("/api/scrap-tools")
		.then((res) => (res.ok ? res.json() : { toolIds: [] }))
		.then((body: { toolIds?: number[] }) => body.toolIds ?? [])
		.catch(() => []);

	return pendingRequest;
};

/**
 * @description 찜한 툴 ID를 브라우저에서 받아 카드들에 뿌립니다.
 * @note 서버에서 받지 않는 이유는 scrap-tools가 200ms 넘게 걸려 RSC 스트림을 붙잡기 때문입니다.
 * 툴 목록은 공개 캐시라 즉시 나가고, 찜 여부만 뒤늦게 칠해집니다.
 */
export const ScrappedToolsProvider = ({
	initialIds,
	children,
}: {
	/** 조회 없이 값을 고정합니다. 스토리북처럼 네트워크가 없는 환경용입니다. */
	initialIds?: number[];
	children: React.ReactNode;
}) => {
	const isLoggedIn = useIsLoggedIn();
	const [ids, setIds] = useState<Set<number>>(() => new Set(initialIds));

	useEffect(() => {
		if (initialIds || !isLoggedIn) return;

		let alive = true;
		loadScrappedIds().then((loaded) => {
			if (alive) setIds(new Set(loaded));
		});

		return () => {
			alive = false;
		};
	}, [initialIds, isLoggedIn]);

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
