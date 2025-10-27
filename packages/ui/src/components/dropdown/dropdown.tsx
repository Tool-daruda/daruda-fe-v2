import { assignInlineVars } from "@vanilla-extract/dynamic";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import IcArrowBottom from "../../assets/icons/ic_arrow_bottom.svg?react";
import * as S from "./dropdown.css";
import type { DropdownProps, Option } from "./dropdown.types";

const useOutsideClick = (ref: React.RefObject<HTMLDivElement | null>, handler: () => void) => {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return;
			}
			handler();
		};
		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, handler]);
};

export const Dropdown = ({
	options,
	value,
	onChange,
	placeholder = "선택하세요",
	disabled = false,
	className,
	maxHeight,
}: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useOutsideClick(dropdownRef, () => setIsOpen(false));

	const selectedOption = options.find((opt) => opt.value === value);

	const handleToggle = () => !disabled && setIsOpen(!isOpen);

	const handleSelect = (option: Option) => {
		onChange(option);
		setIsOpen(false);
	};

	return (
		<div ref={dropdownRef} className={`${S.rootStyle} ${className ?? ""}`}>
			<button
				type="button"
				className={S.dropdownTriggerRecipe({
					open: isOpen,
					disabled,
					hasValue: !!selectedOption,
				})}
				onClick={handleToggle}
				disabled={disabled}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				data-state={isOpen ? "open" : "closed"}
			>
				<span>{selectedOption?.label || placeholder}</span>
				<span className={S.arrowIconStyle}>
					<IcArrowBottom />
				</span>
			</button>

			{isOpen && (
				<ul
					className={
						typeof maxHeight === "number" && maxHeight > 0
							? `${S.optionsListStyle} ${S.optionsListCapped} `
							: S.optionsListStyle
					}
					style={
						typeof maxHeight === "number" && maxHeight > 0
							? assignInlineVars({ [S.rowsVar]: String(maxHeight) })
							: undefined
					}
				>
					{options.map((option) => (
						<li
							key={option.value}
							className={S.optionItemRecipe({ selected: option.value === value })}
						>
							<button
								type="button"
								onClick={() => handleSelect(option)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										handleSelect(option);
									}
								}}
								tabIndex={0}
							>
								{option.label}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
