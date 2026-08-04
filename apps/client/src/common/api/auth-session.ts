import { cookies } from "next/headers";

/**
 * @description 인증 쿠키 존재 여부로 로그인 상태를 판정합니다.
 * @note 네트워크 호출이 없어 루트 레이아웃처럼 모든 요청에서 실행되는 위치에 적합합니다.
 * 토큰의 유효성까지 검증하지는 않습니다. 만료 검증은 미들웨어가, 실제 인가는 API가 담당합니다.
 */
export async function hasAuthSession() {
	const cookieStore = await cookies();

	return (
		Boolean(cookieStore.get("accessToken")?.value) ||
		Boolean(cookieStore.get("refreshToken")?.value)
	);
}
