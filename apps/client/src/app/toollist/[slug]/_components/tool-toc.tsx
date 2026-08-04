"use client";

import { TOC_ITEMS } from "../_constants/toc";
import { useTocNavigation } from "../_hooks/use-toc-navigation";
import * as styles from "./styles/tool-sidebar.css";

export const ToolToc = () => {
	const { activeId, scrollToSection } = useTocNavigation();

	return (
		<ul className={styles.tocList}>
			{TOC_ITEMS.map((item) => (
				<li key={item.id}>
					<button
						type="button"
						onClick={() => scrollToSection(item.id)}
						aria-current={item.id === activeId ? "true" : undefined}
						className={`${styles.tocButton} ${
							item.id === activeId ? styles.activeTocItem : styles.inactiveTocItem
						}`}
					>
						{item.label}
					</button>
				</li>
			))}
		</ul>
	);
};
