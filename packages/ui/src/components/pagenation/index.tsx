import usePagenation from "../../hooks/use-pagenation";
import * as styles from "./pagenation.css";

interface PageNationProps {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const PageNation = ({ page, totalPages, onPageChange }: PageNationProps) => {
	const {
		handlePageChange,
		handlePrevGroup,
		handleNextGroup,
		pagesToShow,
		pageGroup,
		totalGroups,
	} = usePagenation(totalPages, onPageChange);

	return (
		<nav className={styles.paginationContainer}>
			{/* 이전 그룹 이동 */}
			<button
				type="button"
				className={styles.pageButton}
				onClick={handlePrevGroup}
				disabled={pageGroup === 0}
			>
				&lt;
			</button>

			{/* 페이지 번호 */}
			{pagesToShow.map((num) => (
				<button
					key={num}
					type="button"
					className={`${styles.pageButton} ${num === page ? styles.active : ""}`}
					onClick={() => handlePageChange(num)}
				>
					{num}
				</button>
			))}

			{/* 다음 그룹 이동 */}
			<button
				type="button"
				className={styles.pageButton}
				onClick={handleNextGroup}
				disabled={pageGroup === totalGroups - 1}
			>
				&gt;
			</button>
		</nav>
	);
};

export default PageNation;
