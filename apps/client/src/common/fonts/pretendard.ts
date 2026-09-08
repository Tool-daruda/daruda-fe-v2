import localFont from "next/font/local";

/**
 * `scripts/subset-pretendard.py`가 만든 KS X 1001 서브셋(450KB, 45~930 가변).
 *
 * `preload: false`인 이유 — 450KB를 최고 우선순위로 미리 받으면 임계 경로를 밀어낸다.
 * Lighthouse 모바일 프리셋 메인 페이지 3회 측정에서 preload를 켰을 때 LCP 5.1~5.4s(score 80),
 * 껐을 때 2.3~2.5s(score 97)로 갈렸다. 교체가 실제로 일어난 조건(preload를 켜서 폰트를 끝까지
 * 받게 한 런)에서 `/`·`/community`·`/toollist` 모두 CLS 0이라 swap으로 미뤄도 안전하다.
 *
 * CLS가 0인 주된 이유는 아래 `adjustFontFallback`이 아니라 **타이포 토큰이 전부 `lineHeight`를
 * px로 못박아 둔 것**이다. 줄 높이가 폰트 metric과 무관해져서 교체 시 세로로 밀리지 않는다.
 */
export const pretendard = localFont({
	src: "./PretendardVariable.subset.woff2",
	weight: "45 930",
	style: "normal",
	display: "swap",
	preload: false,
	variable: "--font-pretendard",
	// 폴백 metric 보정. 다만 next/font가 만드는 보정 페이스는 `local("Arial")` 기반이라
	// 한글에는 적용되지 않는다 — 라틴 구간에서만 효과가 있다.
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
