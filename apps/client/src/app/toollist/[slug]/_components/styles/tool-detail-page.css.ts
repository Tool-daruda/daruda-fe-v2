import { colors } from "@repo/ui/foundations";
import { style } from "@vanilla-extract/css";

export const page = style({
	width: "100%",
	maxWidth: "1200px",
	margin: "0 auto",
	padding: "40px 24px 120px",
	background: colors.grayscale[25],
});

export const contentLayout = style({
	display: "grid",
	gridTemplateColumns: "260px minmax(0, 1fr)",
	gap: "24px",
	marginTop: "24px",
});

export const sidebarArea = style({
	position: "sticky",
	top: "24px",
	alignSelf: "start",
});

export const mainArea = style({
	display: "flex",
	flexDirection: "column",
	gap: "70px",
	borderRadius: "16px",
	padding: "30px 0",
	border: `1px solid ${colors.grayscale[25]}`,
	background: colors.grayscale[0],
});
