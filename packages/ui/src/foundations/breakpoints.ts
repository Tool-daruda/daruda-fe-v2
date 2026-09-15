export const breakpoints = {
	sm: 600,
	md: 768,
	lg: 1080,
} as const;

/** vanilla-extract `@media` 키에 그대로 넣는 문자열 */
export const media = {
	belowSm: `screen and (max-width: ${breakpoints.sm - 1}px)`,
	belowMd: `screen and (max-width: ${breakpoints.md - 1}px)`,
	belowLg: `screen and (max-width: ${breakpoints.lg - 1}px)`,
	mdUp: `screen and (min-width: ${breakpoints.md}px)`,
	reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;
