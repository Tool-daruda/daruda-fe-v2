"use client";

import { TOAST_EXIT_DURATION } from "./toast.css";

export type ToastStatus = "visible" | "leaving";

export type ToastItem = {
	id: number;
	message: string;
	status: ToastStatus;
};

export type ToastOptions = {
	/** 자동으로 닫히기까지의 시간(ms). 기본값 2000 */
	duration?: number;
};

const DEFAULT_DURATION = 2000;
const MAX_VISIBLE = 3;

type Listener = () => void;

const listeners = new Set<Listener>();
const timers = new Map<number, ReturnType<typeof setTimeout>>();
const EMPTY: ToastItem[] = [];

let toasts: ToastItem[] = EMPTY;
let nextId = 0;

function setToasts(next: ToastItem[]) {
	toasts = next;
	for (const listener of listeners) {
		listener();
	}
}

function clearTimer(id: number) {
	const timer = timers.get(id);
	if (timer === undefined) return;

	clearTimeout(timer);
	timers.delete(id);
}

function removeToast(id: number) {
	clearTimer(id);
	setToasts(toasts.filter((item) => item.id !== id));
}

/** 퇴장 애니메이션을 재생한 뒤 목록에서 제거한다. */
export function dismissToast(id: number) {
	const target = toasts.find((item) => item.id === id);
	if (!target || target.status === "leaving") return;

	clearTimer(id);
	setToasts(toasts.map((item) => (item.id === id ? { ...item, status: "leaving" } : item)));
	timers.set(
		id,
		setTimeout(() => {
			removeToast(id);
		}, TOAST_EXIT_DURATION)
	);
}

export function dismissAllToasts() {
	for (const item of [...toasts]) {
		dismissToast(item.id);
	}
}

/**
 * 토스트를 띄운다. 훅이 아니므로 컴포넌트 밖(이벤트 핸들러, 유틸 함수)에서도 호출할 수 있다.
 * @returns 토스트 id. `dismissToast(id)`로 직접 닫을 수 있다.
 */
export function toast(message: string, { duration = DEFAULT_DURATION }: ToastOptions = {}) {
	const id = nextId++;

	setToasts([...toasts, { id, message, status: "visible" }]);
	timers.set(
		id,
		setTimeout(() => {
			dismissToast(id);
		}, duration)
	);

	const visible = toasts.filter((item) => item.status === "visible");
	for (const item of visible.slice(0, visible.length - MAX_VISIBLE)) {
		dismissToast(item.id);
	}

	return id;
}

export function subscribeToasts(listener: Listener) {
	listeners.add(listener);

	return () => {
		listeners.delete(listener);
	};
}

export function getToasts() {
	return toasts;
}

/** 서버에서는 항상 비어 있다. (모듈 상태가 요청 간 공유되므로 고정값을 돌려준다) */
export function getServerToasts() {
	return EMPTY;
}
