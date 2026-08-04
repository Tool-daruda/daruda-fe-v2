import axios, { type AxiosResponse } from "axios";
import { get } from "@/shared/api";

export interface PresignedUrlParams {
	prefix: "profile" | "board" | "tool" | string;
	extension: string;
}

export interface PresignedUrlRes {
	presignedUrl: string;
	publicUrl: string;
}

export const getPresignedUrls = async ({
	prefix,
	extension,
}: PresignedUrlParams): Promise<PresignedUrlRes> => {
	try {
		const query = new URLSearchParams({
			prefix,
			extension: extension.startsWith(".") ? extension : `.${extension}`,
		}).toString();

		const res: AxiosResponse = await get(`/image/presigned-url?${query}`);
		return res.data;
	} catch (err) {
		console.error("Presigned URL 발급 실패:", err);
		throw err;
	}
};

export const putFileToS3 = async ({ file, signedUrl }: { file: File; signedUrl: string }) => {
	try {
		await axios.put(signedUrl, file, {
			headers: {
				"Content-Type": file.type,
			},
			withCredentials: false,
		});
	} catch (error) {
		console.error("S3 파일 업로드 실패:", error);
		throw error;
	}
};
