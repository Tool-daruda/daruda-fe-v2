import { UserApi } from "@/common/api/user-api";
import { UserProvider } from "@/common/context/user-context";

export default async function CommunityLayout({ children }: { children: React.ReactNode }) {
	// 게시글/댓글의 소유자 판정(useContentMenu)에 닉네임이 필요하므로 프로필을 조회합니다.
	const user = await UserApi.getCurrentUser().catch((error) => {
		console.error("[CommunityLayout] 프로필 조회 실패", error);
		return null;
	});

	return (
		<section style={{ minHeight: "100vh" }}>
			<UserProvider user={user}>{children}</UserProvider>
		</section>
	);
}
