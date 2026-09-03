"use client";

import { createContext, use, useContext } from "react";

/**
 * @description 찜한 툴 ID 목록을 담는 컨텍스트입니다.
 * @note 값이 아니라 프로미스를 담아, 목록(공개 캐시)이 먼저 그려지고 찜 여부만 뒤늦게 채워지게 합니다.
 */
const ScrappedToolIdsContext = createContext<Promise<number[]> | null>(null);

export const ScrappedToolsProvider = ({
	idsPromise,
	children,
}: {
	idsPromise: Promise<number[]>;
	children: React.ReactNode;
}) => (
	<ScrappedToolIdsContext.Provider value={idsPromise}>{children}</ScrappedToolIdsContext.Provider>
);

const NO_SCRAPS: number[] = [];

/**
 * @description 해당 툴을 찜했는지 판정합니다. 프로미스가 풀릴 때까지 서스펜드하므로
 * 호출하는 컴포넌트는 중립 상태(빈 북마크)를 fallback으로 갖는 `<Suspense>` 안에 있어야 합니다.
 * @note 프로바이더가 없는 화면은 찜 정보를 모르므로 항상 false입니다.
 */
export const useIsScrapped = (toolId: number | undefined) => {
	const idsPromise = useContext(ScrappedToolIdsContext);
	const ids = idsPromise ? use(idsPromise) : NO_SCRAPS;

	return toolId !== undefined && ids.includes(toolId);
};
