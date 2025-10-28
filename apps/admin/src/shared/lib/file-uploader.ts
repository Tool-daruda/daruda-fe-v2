import { getPresignedUrls, putFileToS3 } from "../api/file-api";

export const uploadFileAndGetUrl = async (file: File): Promise<string> => {
	if (!(file instanceof File)) {
		throw new Error("유효하지 않은 파일 객체입니다.");
	}

	try {
		const signedUrl = await getPresignedUrls(file.name);

		await putFileToS3({ file, signedUrl });

		const imageUrl = signedUrl.split("?")[0];

		return imageUrl;
	} catch (error) {
		console.error("파일 업로드 통합 프로세스 실패:", error);
		throw new Error("이미지 업로드 중 오류가 발생했습니다.");
	}
};
