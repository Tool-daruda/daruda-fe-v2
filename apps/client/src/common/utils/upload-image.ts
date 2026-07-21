import { getPresignedUrlAction } from "@/common/api/actions/image.actions";
import { getFileExtension, uploadToS3 } from "./upload-to-s3";

export async function uploadImage(file: File, prefix: string): Promise<string> {
	const urlResult = await getPresignedUrlAction({ prefix, extension: getFileExtension(file) });
	if (!urlResult.success) throw new Error(urlResult.error);
	await uploadToS3(urlResult.data.presignedUrl, file);
	return urlResult.data.publicUrl;
}
