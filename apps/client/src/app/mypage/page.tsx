import { UserApi } from "@/common/api/user-api";
import UserProfileClient from "./user/client";

export default async function UserProfilePage() {
	const initialProfile = await UserApi.getUserProfile();

	return <UserProfileClient initialData={initialProfile} />;
}
