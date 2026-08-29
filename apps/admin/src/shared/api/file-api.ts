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

const uploadStepError = (step: string, error: unknown) => {
	if (axios.isAxiosError(error)) {
		const status = error.response?.status;
		if (status === 401 || status === 403) {
			return new Error(
				`${step} 권한이 없습니다. 로그아웃 후 다시 로그인해 주세요. (HTTP ${status})`
			);
		}
		if (status) {
			return new Error(`${step} 중 서버 오류 (HTTP ${status})`);
		}
		return new Error(
			`${step} 요청이 서버에 닿지 못했습니다. 로그인 만료, 네트워크 차단(확장프로그램·사내망), CORS 중 하나입니다.`
		);
	}
	return new Error(`${step} 실패: ${error instanceof Error ? error.message : String(error)}`);
};

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
		throw uploadStepError("업로드 URL 발급", err);
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
		throw uploadStepError("이미지 저장소 업로드", error);
	}
};
