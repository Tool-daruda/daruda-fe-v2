export const formatTime = (dateStr: string) => {
	try {
		const date = new Date(dateStr);

		if (Number.isNaN(date.getTime())) {
			return dateStr;
		}

		const hh = String(date.getHours()).padStart(2, "0");
		const mm = String(date.getMinutes()).padStart(2, "0");
		return `${hh}:${mm}`;
	} catch {
		return dateStr;
	}
};
