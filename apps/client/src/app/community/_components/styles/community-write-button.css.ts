import { style } from "@vanilla-extract/css";

export const button = style({
	position: "fixed",
	right: "40px",
	bottom: "40px",
	zIndex: 50,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "60px",
	height: "60px",
	borderRadius: "30px",
	backgroundColor: "#75819d",
	boxShadow: "0 8px 20px rgba(41, 41, 41, 0.24)",
	transition: "transform 0.15s ease, box-shadow 0.15s ease",

	":hover": {
		transform: "translateY(-2px)",
		boxShadow: "0 12px 24px rgba(41, 41, 41, 0.28)",
	},

	"@media": {
		"screen and (max-width: 560px)": {
			right: "20px",
			bottom: "20px",
			width: "52px",
			height: "52px",
		},
	},
});
