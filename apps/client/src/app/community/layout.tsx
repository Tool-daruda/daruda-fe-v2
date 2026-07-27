import { UserApi } from "@/common/api/user-api";
import { UserProvider } from "@/common/context/user-context";

export default async function CommunityLayout({ children }: { children: React.ReactNode }) {
	let user = null;
	try {
		user = await UserApi.getUserProfile();
	} catch {
		// 비로그인 상태
	}

	return (
		<UserProvider user={user}>
			<section style={{ minHeight: "100vh" }}>{children}</section>
		</UserProvider>
	);
}
