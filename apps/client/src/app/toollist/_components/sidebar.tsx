"use client";

import type { CategoryRes } from "@/common/api/models/tool.model";
import * as s from "./styles/sidebar.css";

interface SidebarProps {
	categories: CategoryRes[];
	selectedCategory: string;
	onSelectCategory: (categoryName: string) => void;
}

export const Sidebar = ({ categories, selectedCategory, onSelectCategory }: SidebarProps) => {
	return (
		<aside className={s.sidebarContainer}>
			<h2 className={s.title}>카테고리</h2>
			<nav className={s.list}>
				{categories.map((cat) => (
					<button
						key={cat.name}
						className={`${s.categoryItem} ${selectedCategory === cat.name ? "active" : ""}`}
						onClick={() => onSelectCategory(cat.name)}
						type="button"
					>
						<span>{cat.koreanName}</span>
						<div className={s.radioCircle}>
							<div className={s.radioInner} />
						</div>
					</button>
				))}
			</nav>
		</aside>
	);
};
