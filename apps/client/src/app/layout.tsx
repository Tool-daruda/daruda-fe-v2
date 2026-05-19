import "@repo/ui/index.css";
import "@repo/ui/foundations.css";
import { themeClass } from "@repo/ui/foundations";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import "../common/styles/reset.css";

export const metadata: Metadata = {
	title: "daruda",
	description: "대학생활에 필요한 툴을 다루다",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="ko" className={themeClass}>
			<body>{children}</body>
		</html>
	);
}
