export const uploadToS3 = async (presignedUrl: string, file: File): Promise<void> => {
	const res = await fetch(presignedUrl, {
		method: "PUT",
		body: file,
		headers: { "Content-Type": file.type },
	});
	if (!res.ok) throw new Error("이미지 업로드에 실패했습니다.");
};

export const getFileExtension = (file: File): string => {
	const lastDot = file.name.lastIndexOf(".");
	return lastDot !== -1 ? file.name.substring(lastDot) : ".jpg";
};
