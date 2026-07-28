"use server";

import { fetchServer } from "@/common/api/fetch-server";
import { createSafeAction } from "@/common/api/safe-action";

export interface PresignedUrlRes {
	presignedUrl: string;
	publicUrl: string;
}

export const getPresignedUrlAction = createSafeAction(
	async ({ prefix, extension }: { prefix: string; extension: string }) => {
		const query = new URLSearchParams({
			prefix,
			extension: extension.startsWith(".") ? extension : `.${extension}`,
		}).toString();

		return fetchServer<PresignedUrlRes>(`/api/v1/image/presigned-url?${query}`);
	}
);
