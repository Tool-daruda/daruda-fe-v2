"use client";

import { useState } from "react";
import * as s from "./styles/sidebar.css";

const CATEGORIES = [
	"전체",
	"AI",
	"문서작성&편집",
	"프레젠테이션",
	"협업&커뮤니케이션",
	"데이터",
	"그래픽&디자인",
	"영상&음악",
	"코딩&개발",
	"설계&모델링",
	"생활",
	"커리어&자기개발",
];

export const Sidebar = () => {
	const [selected, setSelected] = useState("전체");

	return (
		<aside className={s.sidebarContainer}>
			<h2 className={s.title}>카테고리</h2>
			<nav className={s.list}>
				{CATEGORIES.map((cat) => (
					<button
						key={cat}
						className={`${s.categoryItem} ${selected === cat ? "active" : ""}`}
						onClick={() => setSelected(cat)}
						type="button"
					>
						<span>{cat}</span>
						<div className={s.radioCircle}>
							<div className={s.radioInner} />
						</div>
					</button>
				))}
			</nav>
		</aside>
	);
};
