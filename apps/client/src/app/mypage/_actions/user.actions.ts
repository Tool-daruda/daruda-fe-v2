"use server";

import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/common/api/safe-action";
import { UserApi } from "@/common/api/user-api";

/**
 * @description 사용자 프로필 수정
 */
async function updateUserProfile(payload: Partial<{ nickname: string; positions: string }>) {
	const data = await UserApi.updateUserProfile(payload);

	revalidatePath("/mypage/user");
	return data;
}

export const updateUserProfileAction = createSafeAction(updateUserProfile);

/**
 * @description 회원 탈퇴
 */
async function withdrawUser(_: undefined) {
	await UserApi.withdrawUser();
	return { success: true };
}

export const withdrawUserAction = createSafeAction(withdrawUser);
