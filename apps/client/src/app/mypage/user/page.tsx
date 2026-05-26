import { redirect } from "next/navigation";
import { UserApi } from "@/common/api/user-api";
import UserProfileClient from "./client";

export default async function UserProfilePage() {
	try {
		const initialProfile = await UserApi.getUserProfile();

		if (!initialProfile) {
			redirect("/login");
		}

		return <UserProfileClient initialData={initialProfile} />;
	} catch (error) {
		console.error("프로필 조회 실패 (비로그인 상태 또는 토큰 만료):", error);

		redirect("/login");
	}
}
