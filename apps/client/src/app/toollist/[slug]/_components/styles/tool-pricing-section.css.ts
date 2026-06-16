import { themeVars } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const container = style({
	padding: "0 24px",
});

export const header = style({
	marginBottom: "16px",
});

export const title = style({
	...themeVars.fonts.t3_1,
	color: themeVars.colors.grayscale[900],
});

export const description = style({
	marginTop: "8px",
	fontSize: "14px",
	color: "#6b7280",
});

export const tabRow = style({
	display: "flex",
	gap: "8px",
	marginBottom: "20px",
});

export const activeTab = style({
	height: "32px",
	padding: "0 12px",
	borderRadius: "999px",
	border: "none",
	background: "#111827",
	color: "#ffffff",
	fontSize: "13px",
	fontWeight: 700,
	cursor: "pointer",
});

export const tab = style({
	height: "32px",
	padding: "0 12px",
	borderRadius: "999px",
	border: "1px solid #e5e7eb",
	background: "#ffffff",
	color: "#6b7280",
	fontSize: "13px",
	fontWeight: 600,
	cursor: "pointer",
});

export const planList = style({
	display: "flex",
	flexDirection: "column",
	gap: "14px",
});

export const plan = style({
	padding: "20px",
	borderRadius: "18px",
	border: "1px solid #ececec",
	background: "#fafafa",
});

export const recommendedPlan = style([
	plan,
	{
		border: "1px solid #c4b5fd",
		background: "#f5f3ff",
	},
]);

export const planHeader = style({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	gap: "12px",
	flexWrap: "wrap",
});

export const planName = style({
	fontSize: "18px",
	fontWeight: 700,
	color: "#4c1d95",
});

export const planPrice = style({
	fontSize: "16px",
	fontWeight: 700,
	color: "#111827",
});

export const planDescription = style({
	marginTop: "8px",
	fontSize: "14px",
	color: "#6b7280",
});

export const featureList = style({
	marginTop: "14px",
	display: "flex",
	flexDirection: "column",
	gap: "8px",
});

export const featureItem = style({
	fontSize: "14px",
	lineHeight: 1.6,
	color: "#374151",
});
