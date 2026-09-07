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
	/** 서버 스냅샷을 받아 `ids`가 실제 찜 상태와 같은지. 못 받았으면 `ids`는 비어 있을 뿐입니다. */
	isReady: boolean;
	/** 요청을 시작한 세션. 이 값과 어긋난 갱신은 무시됩니다. */
	getSession: () => number;
	setScrapped: (toolId: number, next: boolean, session: number) => void;
}

const EMPTY: ScrappedTools = {
	ids: new Set(),
	isReady: false,
	getSession: () => 0,
	setScrapped: () => {},
};

const ScrappedToolsContext = createContext<ScrappedTools>(EMPTY);

// 조회가 실패하면 찜 버튼이 잠기므로, 놓아두지 않고 몇 번 더 시도합니다.
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000;

/** 실패는 `null`입니다. 빈 배열과 섞으면 "찜이 없다"와 구분되지 않습니다. */
const fetchScrappedIds = (): Promise<number[] | null> =>
	fetch("/api/scrap-tools")
		.then((res) => (res.ok ? res.json() : null))
		.then((body: { toolIds?: number[] } | null) => body?.toolIds ?? null)
		.catch(() => null);

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
	const [isReady, setIsReady] = useState(initialIds !== undefined);
	const [retryCount, setRetryCount] = useState(0);

	// 라우트를 옮겨다녀도 한 세션에 한 번만 부르도록 프로미스를 붙들어 둡니다.
	// 모듈 전역에 두면 SSR 때 서버에서도 평가돼 사용자끼리 공유됩니다.
	const pendingRequest = useRef<Promise<number[] | null> | null>(null);

	// 목록이 도착하기 전에 사용자가 누른 것들. 스냅샷은 이 클릭 이전 상태라 그대로 덮으면 되돌아갑니다.
	const localEdits = useRef(new Map<number, boolean>());

	// 로그아웃할 때마다 올립니다. 이전 세션에서 보낸 요청이 늦게 끝나도 상태를 되살리지 못합니다.
	const session = useRef(0);

	// 배열을 그대로 의존성에 넣으면 인라인 리터럴마다 effect가 다시 돕니다.
	const isFixed = initialIds !== undefined;

	useEffect(() => {
		if (isFixed) return;

		if (!isLoggedIn) {
			session.current += 1;
			// 다음 로그인이 새로 받도록 붙들어둔 프로미스까지 버립니다.
			pendingRequest.current = null;
			localEdits.current.clear();
			setIsReady(false);
			setRetryCount(0);
			setIds((prev) => (prev.size === 0 ? prev : new Set()));
			return;
		}

		pendingRequest.current ??= fetchScrappedIds();

		let alive = true;
		let retryTimer: ReturnType<typeof setTimeout> | undefined;

		pendingRequest.current.then((loaded) => {
			// 실패는 붙들지 않습니다. 붙들면 이 세션 내내 같은 실패를 재사용합니다.
			if (loaded === null) {
				pendingRequest.current = null;
				if (!alive || retryCount >= MAX_RETRIES) return;

				retryTimer = setTimeout(() => setRetryCount((n) => n + 1), RETRY_DELAY_MS);
				return;
			}

			if (!alive) return;

			const next = new Set(loaded);
			// 기다리는 동안 누른 건 서버가 이미 처리했으니 스냅샷보다 우선합니다.
			for (const [toolId, scrapped] of localEdits.current) {
				if (scrapped) next.add(toolId);
				else next.delete(toolId);
			}
			setIds(next);
			setIsReady(true);
		});

		return () => {
			alive = false;
			clearTimeout(retryTimer);
		};
	}, [isFixed, isLoggedIn, retryCount]);

	const getSession = useCallback(() => session.current, []);

	const setScrapped = useCallback((toolId: number, next: boolean, requestSession: number) => {
		if (requestSession !== session.current) return;

		localEdits.current.set(toolId, next);
		setIds((prev) => {
			const updated = new Set(prev);
			if (next) updated.add(toolId);
			else updated.delete(toolId);
			return updated;
		});
	}, []);

	const value = useMemo(
		() => ({ ids, isReady, getSession, setScrapped }),
		[ids, isReady, getSession, setScrapped]
	);

	return <ScrappedToolsContext.Provider value={value}>{children}</ScrappedToolsContext.Provider>;
};

export const useScrappedTools = () => useContext(ScrappedToolsContext);
