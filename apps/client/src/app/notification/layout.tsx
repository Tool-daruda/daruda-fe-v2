import { Suspense } from "react";
import { ApiError } from "@/common/api/errors/api-error";
import { UserApi } from "@/common/api/user-api";
import { AsyncUserProvider } from "@/common/components/async-user-provider";
import { UserProvider } from "@/common/context/user-context";

export default function NotificationLayout({ children }: { children: React.ReactNode }) {
	const userPromise = UserApi.getUserProfile().catch((err) => {
		if (!(err instanceof ApiError) || err.status !== 401) {
			console.error("[NotificationLayout] 프로필 조회 실패", err);
		}
		return null;
	});

	return (
		<Suspense fallback={<UserProvider user={null}>{children}</UserProvider>}>
			<AsyncUserProvider userPromise={userPromise}>{children}</AsyncUserProvider>
		</Suspense>
	);
}
