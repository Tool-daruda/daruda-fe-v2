/**
 * @description Spring Boot 서버의 공통 응답 규격입니다.
 */
export interface ApiResponse<T> {
	status: number;
	code: string;
	message: string;
	data: T;
}
