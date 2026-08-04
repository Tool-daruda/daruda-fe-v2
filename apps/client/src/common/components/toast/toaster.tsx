"use client";

import { useSyncExternalStore } from "react";
import * as styles from "./toast.css";
import { getServerToasts, getToasts, subscribeToasts } from "./toast-store";

/**
 * 토스트가 그려질 자리. root layout의 body 바로 아래에 한 번만 마운트
 * 스토어를 구독하는 건 이 컴포넌트뿐이라 토스트가 떠도 나머지 트리는 리렌더되지 않음
 */
export function Toaster() {
	const toasts = useSyncExternalStore(subscribeToasts, getToasts, getServerToasts);

	return (
		// live region은 항상 떠 있어야 새로 추가된 토스트가 안내된다
		<output className={styles.viewport} aria-live="polite" aria-atomic="false">
			{toasts.map((item) => (
				<div key={item.id} className={styles.toast({ status: item.status })}>
					<span className={styles.message}>{item.message}</span>
				</div>
			))}
		</output>
	);
}
