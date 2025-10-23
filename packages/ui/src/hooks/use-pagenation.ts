import { useEffect, useState } from "react";

const MAX_PAGE_VISIBLE = 5;

const usePagenation = (totalPages: number, page: number, onPageChange: (page: number) => void) => {
	const initialGroup = Math.max(0, Math.floor((Math.max(1, page) - 1) / MAX_PAGE_VISIBLE));
	const [pageGroup, setPageGroup] = useState(initialGroup);

	const totalGroups = Math.ceil(totalPages / MAX_PAGE_VISIBLE);
	const startPage = pageGroup * MAX_PAGE_VISIBLE + 1;
	const endPage = Math.min(startPage + MAX_PAGE_VISIBLE - 1, totalPages);

	useEffect(() => {
		const nextGroup = Math.max(0, Math.floor((Math.max(1, page) - 1) / MAX_PAGE_VISIBLE));
		if (nextGroup !== pageGroup) setPageGroup(nextGroup);
	}, [page, pageGroup]);

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			onPageChange(newPage);
		}
	};

	const handlePrevGroup = () => {
		if (pageGroup > 0) setPageGroup(pageGroup - 1);
	};

	const handleNextGroup = () => {
		if (pageGroup < totalGroups - 1) setPageGroup(pageGroup + 1);
	};

	const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

	return {
		handlePageChange,
		handlePrevGroup,
		handleNextGroup,
		pagesToShow,
		pageGroup,
		totalGroups,
	};
};

export default usePagenation;
