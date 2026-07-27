"use client";

import { type RefObject, useEffect, useRef, useState } from "react";

interface UseMoreMenuReturn {
	isOpen: boolean;
	toggle: (e: React.MouseEvent) => void;
	close: () => void;
	containerRef: RefObject<HTMLDivElement | null>;
}

export const useMoreMenu = (): UseMoreMenuReturn => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;
		const handleClick = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setIsOpen(false);
		};
		document.addEventListener("mousedown", handleClick);
		document.addEventListener("keydown", handleKey);
		return () => {
			document.removeEventListener("mousedown", handleClick);
			document.removeEventListener("keydown", handleKey);
		};
	}, [isOpen]);

	const toggle = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen((prev) => !prev);
	};

	return { isOpen, toggle, close: () => setIsOpen(false), containerRef };
};
