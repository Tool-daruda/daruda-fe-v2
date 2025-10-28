import axios, { type AxiosResponse } from "axios";
import { get } from "@/shared/api";

export const getPresignedUrls = async (fileName: string) => {
	try {
		const res: AxiosResponse = await get(`/image/presigned-url?imageName=${fileName}`);
		return res.data;
	} catch (err) {
		console.error("Presigned URL 발급 실패:", err);
		throw err;
	}
};

export const putFileToS3 = async ({ file, signedUrl }: { file: File; signedUrl: string }) => {
	await axios.put(decodeURIComponent(signedUrl), file, {
		headers: {
			"Content-Type": file.type,
		},
		withCredentials: false,
	});
};
