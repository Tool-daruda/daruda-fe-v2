import { useMemo, useState } from "react";

const MAX_PAGE_VISIBLE = 5;

const usePagination = (totalPages: number, page: number, onPageChange: (page: number) => void) => {
	const initialGroup = Math.max(0, Math.floor((Math.max(1, page) - 1) / MAX_PAGE_VISIBLE));
	const [pageGroup, setPageGroup] = useState(initialGroup);

	const totalGroups = Math.ceil(totalPages / MAX_PAGE_VISIBLE);
	const startPage = pageGroup * MAX_PAGE_VISIBLE + 1;
	const endPage = Math.min(startPage + MAX_PAGE_VISIBLE - 1, totalPages);

	const hasPrevGroup = pageGroup > 0;
	const hasNextGroup = pageGroup < totalGroups - 1;

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			onPageChange(newPage);

			const nextGroup = Math.floor((newPage - 1) / MAX_PAGE_VISIBLE);
			if (nextGroup !== pageGroup) {
				setPageGroup(nextGroup);
			}
		}
	};

	const handlePrevGroup = () => {
		if (hasPrevGroup) {
			const prevGroup = pageGroup - 1;
			setPageGroup(prevGroup);
			onPageChange(prevGroup * MAX_PAGE_VISIBLE + 1);
		}
	};

	const handleNextGroup = () => {
		if (hasNextGroup) {
			const nextGroup = pageGroup + 1;
			setPageGroup(nextGroup);
			onPageChange(nextGroup * MAX_PAGE_VISIBLE + 1);
		}
	};

	const pagesToShow = useMemo(() => {
		return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	}, [startPage, endPage]);

	return {
		handlePageChange,
		handlePrevGroup,
		handleNextGroup,
		pagesToShow,
		pageGroup,
		totalGroups,
		hasPrevGroup,
		hasNextGroup,
	};
};

export default usePagination;
