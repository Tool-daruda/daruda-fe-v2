export const formatTime = (dateStr: string) => {
	try {
		const date = new Date(dateStr);

		if (Number.isNaN(date.getTime())) {
			return dateStr;
		}

		return new Intl.DateTimeFormat("ko-KR", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
			timeZone: "Asia/Seoul",
		}).format(date);
	} catch {
		return dateStr;
	}
};
