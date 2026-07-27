import Image from "next/image";
import * as s from "./more-menu.css";

export interface MoreMenuItem {
	label: string;
	iconSrc: string;
	onClick: () => void;
}

interface MoreMenuProps {
	items: MoreMenuItem[];
	onClose: () => void;
	className?: string;
}

export const MoreMenu = ({ items, onClose, className }: MoreMenuProps) => {
	return (
		<div className={`${s.menu}${className ? ` ${className}` : ""}`} role="menu">
			{items.map((item) => (
				<button
					key={item.label}
					type="button"
					className={s.item}
					role="menuitem"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						item.onClick();
						onClose();
					}}
				>
					<Image src={item.iconSrc} alt="" width={20} height={20} className={s.icon} />
					<span className={s.label}>{item.label}</span>
				</button>
			))}
		</div>
	);
};
