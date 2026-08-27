/** 프로토콜이 없는 주소는 상대 경로로 해석되므로 https를 붙여 외부 링크로 만든다 */
export const toExternalUrl = (url: string) => {
	return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};
