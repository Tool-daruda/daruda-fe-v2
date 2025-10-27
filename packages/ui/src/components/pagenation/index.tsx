import CircleLeft from "../../assets/icons/ic_circle_left.svg?react";
import CircleRight from "../../assets/icons/ic_circle_right.svg?react";
import usePagination from "../../hooks/use-pagenation";
import * as styles from "./pagenation.css";

interface PageNationProps {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PageNationProps) => {
	const {
		handlePageChange,
		handlePrevGroup,
		handleNextGroup,
		pagesToShow,
		hasPrevGroup,
		hasNextGroup,
	} = usePagination(totalPages, page, onPageChange);

	return (
		<nav className={styles.paginationContainer}>
			{/* 이전 그룹 이동 */}
			<button
				type="button"
				className={styles.pageButton}
				onClick={handlePrevGroup}
				disabled={!hasPrevGroup}
			>
				<CircleLeft className={styles.arrowIconClass} />
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
				disabled={!hasNextGroup}
			>
				<CircleRight className={styles.arrowIconClass} />
			</button>
		</nav>
	);
};

export default Pagination;
