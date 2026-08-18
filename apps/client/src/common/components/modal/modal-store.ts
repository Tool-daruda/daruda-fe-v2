"use client";

export type ModalIntent = "primary" | "danger";

export type ConfirmOptions = {
	title: string;
	description?: string;
	/** 기본값 "확인" */
	confirmText?: string;
	/** 기본값 "취소" */
	cancelText?: string;
	/** 되돌릴 수 없는 동작이면 "danger". 기본값 "primary" */
	intent?: ModalIntent;
};

export type ModalState = ConfirmOptions & { id: number };

type Listener = () => void;

const listeners = new Set<Listener>();

let current: ModalState | null = null;
let resolveCurrent: ((result: boolean) => void) | null = null;
let nextId = 0;

function emit() {
	for (const listener of listeners) {
		listener();
	}
}

/** 대기 중인 confirm()에 결과를 돌려준다. 이미 정리됐으면 아무 일도 하지 않는다. */
function settle(result: boolean) {
	const resolve = resolveCurrent;
	resolveCurrent = null;
	resolve?.(result);
}

/**
 * 확인/취소 모달을 띄우고 사용자가 고른 값을 돌려준다. window.confirm의 대체재.
 * 훅이 아니므로 컴포넌트 밖(이벤트 핸들러, 유틸 함수)에서도 호출할 수 있다.
 *
 * @example
 * if (await confirm({ title: "정말 탈퇴하시겠어요?", intent: "danger" })) {
 * 	await withdraw();
 * }
 */
export function confirm(options: ConfirmOptions) {
	// 모달은 한 번에 하나만 띄운다. 열려 있던 건 취소로 정리한다.
	settle(false);

	const promise = new Promise<boolean>((resolve) => {
		resolveCurrent = resolve;
	});

	current = { ...options, id: nextId++ };
	emit();

	return promise;
}

/** 모달을 닫는다. `result`가 confirm()의 반환값이 된다. */
export function closeModal(result: boolean) {
	if (!current) return;

	current = null;
	emit();
	settle(result);
}

export function subscribeModal(listener: Listener) {
	listeners.add(listener);

	return () => {
		listeners.delete(listener);
	};
}

export function getModal() {
	return current;
}

/** 서버에서는 항상 닫혀 있다. (모듈 상태가 요청 간 공유되므로 고정값을 돌려준다) */
export function getServerModal() {
	return null;
}
