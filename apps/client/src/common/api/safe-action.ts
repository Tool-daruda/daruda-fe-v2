/**
 * @description Server Action의 실행 결과 규격을 정의합니다.
 */
export type ActionResponse<T> =
	| { success: true; data: T; error?: never }
	| { success: false; data?: never; error: string };

/**
 * @description Server Action을 감싸서 공통 에러 처리 및 결과 규격을 통일하는 고차 함수(HOF)입니다.
 * @param handler 실행할 비즈니스 로직 함수
 */
export function createSafeAction<T, R>(
	handler: (data: T) => Promise<R>
): (data: T) => Promise<ActionResponse<R>> {
	return async (data: T): Promise<ActionResponse<R>> => {
		try {
			const result = await handler(data);
			return { success: true, data: result };
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";

			return { success: false, error: errorMessage };
		}
	};
}
