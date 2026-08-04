export const formatDate = (dateStr: string) => {
	try {
		const date = new Date(dateStr);

		if (Number.isNaN(date.getTime())) {
			return dateStr;
		}

		const yyyy = date.getFullYear();
		const mm = String(date.getMonth() + 1).padStart(2, "0");
		const dd = String(date.getDate()).padStart(2, "0");
		return `${yyyy}.${mm}.${dd}`;
	} catch {
		return dateStr;
	}
};

export const formatRelativeTime = (dateStr: string) => {
	try {
		const date = new Date(dateStr);
		if (Number.isNaN(date.getTime())) return dateStr;

		const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
		if (diffSec < 60) return "방금 전";
		const diffMin = Math.floor(diffSec / 60);
		if (diffMin < 60) return `${diffMin}분 전`;
		const diffHour = Math.floor(diffMin / 60);
		if (diffHour < 24) return `${diffHour}시간 전`;
		const diffDay = Math.floor(diffHour / 24);
		if (diffDay < 7) return `${diffDay}일 전`;

		return formatDate(dateStr);
	} catch {
		return dateStr;
	}
};
