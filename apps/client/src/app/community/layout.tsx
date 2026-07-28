import { Suspense } from "react";
import { ApiError } from "@/common/api/errors/api-error";
import { UserApi } from "@/common/api/user-api";
import { UserProvider } from "@/common/context/user-context";
import { AsyncUserProvider } from "./_components/async-user-provider";

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
	const userPromise = UserApi.getUserProfile().catch((err) => {
		if (!(err instanceof ApiError) || err.status !== 401) {
			console.error("[CommunityLayout] 프로필 조회 실패", err);
		}
		return null;
	});

	return (
		<section style={{ minHeight: "100vh" }}>
			<Suspense fallback={<UserProvider user={null}>{children}</UserProvider>}>
				<AsyncUserProvider userPromise={userPromise}>{children}</AsyncUserProvider>
			</Suspense>
		</section>
	);
}
