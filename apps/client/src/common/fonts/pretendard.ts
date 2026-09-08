import localFont from "next/font/local";

/**
 * `scripts/subset-pretendard.py`가 만든 KS X 1001 서브셋(450KB, 45~930 가변).
 *
 * `preload: false`인 이유 — 450KB를 최고 우선순위로 미리 받으면 임계 경로를 밀어낸다.
 * Lighthouse 모바일 프리셋 메인 페이지 3회 측정에서 preload를 켰을 때 LCP 5.1~5.4s(score 80),
 * 껐을 때 2.3~2.5s(score 97)로 갈렸다. 폴백 metric을 맞춰둬 교체 시 레이아웃이 흔들리지
 * 않으므로(CLS 0), 폰트는 임계 경로 뒤에 받고 swap으로 갈아끼우는 편이 낫다.
 */
export const pretendard = localFont({
	src: "./PretendardVariable.subset.woff2",
	weight: "45 930",
	style: "normal",
	display: "swap",
	preload: false,
	variable: "--font-pretendard",
	// 폰트가 도착하기 전 폴백을 원본 metric에 맞춰 늘려 CLS를 막는다
	adjustFontFallback: "Arial",
	fallback: [
		"-apple-system",
		"BlinkMacSystemFont",
		"system-ui",
		"Apple SD Gothic Neo",
		"Malgun Gothic",
		"sans-serif",
	],
});
