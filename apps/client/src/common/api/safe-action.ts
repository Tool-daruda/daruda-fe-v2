import { ApiError } from "./errors/api-error";

/**
 * @description Server Action의 실행 결과 규격을 정의합니다.
 */
export type ActionResponse<T> =
	| { success: true; data: T; error?: never; status?: never }
	| { success: false; data?: never; error: string; status?: number };

// 서버가 401 응답 본문을 비워서 보내므로 fetchServer는 "API Error: 401"까지밖에 만들지 못합니다.
// 그대로 토스트에 띄우면 사용자가 무엇을 해야 할지 알 수 없어 여기서 안내 문구로 바꿉니다.
const AUTH_REQUIRED_MESSAGE = "로그인이 필요해요. 다시 로그인해 주세요.";
const UNEXPECTED_ERROR_MESSAGE = "일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.";
const UNKNOWN_ERROR_MESSAGE = "알 수 없는 오류가 발생했습니다.";

// fetchServer가 응답 본문에서 message를 못 찾았을 때 만드는 기술 문자열입니다.
// 사용자에게 보여줄 문구가 아니므로 걸러냅니다.
const TECHNICAL_MESSAGE_PREFIX = "API Error:";

function toUserMessage(error: ApiError) {
	if (error.status === 401) return AUTH_REQUIRED_MESSAGE;
	if (error.message.startsWith(TECHNICAL_MESSAGE_PREFIX)) return UNEXPECTED_ERROR_MESSAGE;
	return error.message;
}

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
			if (error instanceof ApiError) {
				return { success: false, error: toUserMessage(error), status: error.status };
			}

			const errorMessage = error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE;

			return { success: false, error: errorMessage };
		}
	};
}
