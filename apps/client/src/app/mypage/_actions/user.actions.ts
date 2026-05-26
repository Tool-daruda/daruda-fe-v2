"use server";

import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/common/api/safe-action";
import { UserApi } from "@/common/api/user-api";

async function updateUserProfile(payload: Partial<{ nickname: string; positions: string }>) {
	const data = await UserApi.updateUserProfile(payload);

	revalidatePath("/mypage/user");
	return data;
}

export const updateUserProfileAction = createSafeAction(updateUserProfile);
