"use client";

import { useRouter } from "next/navigation";
import { toast } from "@/common/components/toast";

interface FailedAction {
	error: string;
	status?: number;
}

/**
 * @description Server Action 실패를 토스트로 안내하고, 세션이 끊긴 경우 로그인 상태를 실제와 맞춥니다.
 * @note 401이면 fetchServer가 이미 인증 쿠키를 정리했지만 클라이언트 Context는 그대로입니다.
 * 갱신하지 않으면 헤더는 로그인 상태로 남고, 다음 클릭도 로그인 가드를 그냥 통과해 같은 401을 반복합니다.
 */
export function useActionError() {
	const router = useRouter();

	return (result: FailedAction, fallbackMessage: string) => {
		toast(result.error || fallbackMessage);

		if (result.status === 401) {
			router.refresh();
		}
	};
}
