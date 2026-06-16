import { getPresignedUrls, putFileToS3 } from "../api/file-api";

interface UploadOptions {
	file: File;
	prefix: "profile" | "board" | "tool" | string;
}

export const uploadFileAndGetUrl = async ({ file, prefix }: UploadOptions): Promise<string> => {
	if (!(file instanceof File)) {
		throw new Error("유효하지 않은 파일 객체입니다.");
	}

	try {
		const lastDotIndex = file.name.lastIndexOf(".");
		if (lastDotIndex === -1 || lastDotIndex === file.name.length - 1) {
			throw new Error("파일 확장자를 찾을 수 없습니다. 확장자가 있는 파일을 업로드해주세요.");
		}
		const fileExtension = file.name.substring(lastDotIndex).toLowerCase();

		const { presignedUrl, publicUrl } = await getPresignedUrls({
			prefix,
			extension: fileExtension,
		});

		await putFileToS3({ file, signedUrl: presignedUrl });

		return publicUrl;
	} catch (error) {
		console.error("파일 업로드 통합 프로세스 실패:", error);
		throw new Error(
			`이미지 업로드 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`
		);
	}
};
