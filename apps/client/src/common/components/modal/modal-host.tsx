"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { useScrollLock } from "@/common/hooks/use-scroll-lock";
import * as s from "./modal.css";
import { closeModal, getModal, getServerModal, subscribeModal } from "./modal-store";

/**
 * 모달이 그려질 자리. root layout에 한 번만 마운트한다.
 * 스토어를 구독하는 건 이 컴포넌트뿐이라 모달이 떠도 나머지 트리는 리렌더되지 않는다.
 */
export function ModalHost() {
	const modal = useSyncExternalStore(subscribeModal, getModal, getServerModal);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const titleId = useId();
	const descriptionId = useId();

	useScrollLock(!!modal);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (modal && !dialog.open) dialog.showModal();
		if (!modal && dialog.open) dialog.close();
	}, [modal]);

	const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === dialogRef.current) closeModal(false);
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: 바깥 클릭의 키보드 대응은 Esc이고, dialog가 기본으로 처리한다
		<dialog
			ref={dialogRef}
			className={s.dialog}
			aria-labelledby={titleId}
			aria-describedby={modal?.description ? descriptionId : undefined}
			onClick={handleBackdropClick}
			// Esc나 dialog.close()로 닫힌 경우에도 대기 중인 confirm()을 정리한다.
			onClose={() => closeModal(false)}
		>
			{modal && (
				<div key={modal.id} className={s.body}>
					<div className={s.content}>
						<div className={s.header}>
							<h2 id={titleId} className={s.title}>
								{modal.title}
							</h2>
							<button
								type="button"
								className={s.closeButton}
								onClick={() => closeModal(false)}
								aria-label="닫기"
							>
								<Image src="/icons/ic_cross_24.svg" alt="" width={24} height={24} />
							</button>
						</div>
						{modal.description && (
							<p id={descriptionId} className={s.description}>
								{modal.description}
							</p>
						)}
					</div>

					<div className={s.actions}>
						<button
							type="button"
							className={s.actionButton({ tone: "cancel" })}
							onClick={() => closeModal(false)}
						>
							{modal.cancelText ?? "취소"}
						</button>
						<button
							type="button"
							className={s.actionButton({ tone: modal.intent === "danger" ? "danger" : "primary" })}
							onClick={() => closeModal(true)}
						>
							{modal.confirmText ?? "확인"}
						</button>
					</div>
				</div>
			)}
		</dialog>
	);
}
