/**
 * @note keyword는 사용자가 입력한 검색어라 로그에 남기지 않습니다.
 * category, criteria 같은 나머지 쿼리는 우리 코드가 만든 값이라 그대로 둡니다.
 * 업스트림 호출을 셀 때 어떤 카테고리였는지가 보여야 하기 때문입니다.
 */
export const maskEndpoint = (endpoint: string) =>
	endpoint.replace(/([?&]keyword=)[^&]*/gi, "$1***");
