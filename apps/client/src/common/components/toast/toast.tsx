"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import * as styles from "./toast.css";

type ToastContextValue = {
	showToast: (message: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

type ToastProviderProps = {
	children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
	const [message, setMessage] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const timerRef = useRef<number | null>(null);

	const clearToastTimer = useCallback(() => {
		if (timerRef.current !== null) {
			window.clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	const showToast = useCallback(
		(nextMessage: string, duration = 2000) => {
			clearToastTimer();
			setMessage(nextMessage);
			setIsOpen(true);

			timerRef.current = window.setTimeout(() => {
				setIsOpen(false);
			}, duration);
		},
		[clearToastTimer]
	);

	useEffect(() => {
		return () => {
			clearToastTimer();
		};
	}, [clearToastTimer]);

	const value = useMemo(() => {
		return { showToast };
	}, [showToast]);

	return (
		<ToastContext.Provider value={value}>
			{children}
			{isOpen ? (
				<div className={styles.toastViewport} aria-live="polite" aria-atomic="true">
					<output className={styles.toast} aria-live="polite" aria-atomic="true">
						<span className={styles.message}>{message}</span>
					</output>
				</div>
			) : null}
		</ToastContext.Provider>
	);
}

export function useToastContext() {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error("useToast must be used within ToastProvider");
	}

	return context;
}
