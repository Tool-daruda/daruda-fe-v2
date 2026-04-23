import * as styles from "./favoriteTools.css";

const BookmarkIcon = () => (
	<svg
		width="22"
		height="28"
		viewBox="0 0 24 24"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		className={styles.bookmarkIcon}
		role="img"
		aria-label="북마크"
	>
		<path d="M17 3H7C5.89543 3 5 3.89543 5 5V21L12 18L19 21V5C19 3.89543 18.1046 3 17 3Z" />
	</svg>
);

type PriceType = "paid" | "free" | "freemium";

const DUMMY_TOOLS = Array.from({ length: 15 }).map((_, idx) => {
	const types: PriceType[] = ["paid", "free", "freemium"];
	const labels = { paid: "유료", free: "무료", freemium: "부분 유료" };
	const type = types[idx % 3];

	return {
		id: idx,
		title: "Adobe\nLightroom Classic",
		description: "우리의 지갑을 털어가는 툴입...",
		tags: [
			{ id: 1, name: "데이터" },
			{ id: 2, name: "데이터" },
		],
		priceType: type,
		priceLabel: labels[type],
	};
});

export default function FavoriteToolsPage() {
	return (
		<div className={styles.gridContainer}>
			{DUMMY_TOOLS.map((tool) => (
				<article key={tool.id} className={styles.card}>
					<div className={styles.cardTop}>
						<div className={styles.imagePlaceholder} />
						<div className={styles.textContainer}>
							<h3 className={styles.cardTitle}>{tool.title}</h3>
							<p className={styles.cardDescription}>{tool.description}</p>
						</div>
						<BookmarkIcon />
					</div>

					<div className={styles.tagContainer}>
						{tool.tags.map((tag) => (
							<span key={tag.id} className={styles.defaultTag}>
								{tag.name}
							</span>
						))}
						<span className={styles.priceTag[tool.priceType]}>{tool.priceLabel}</span>
					</div>
				</article>
			))}
		</div>
	);
}
