import "./global.css";
import "@repo/ui/index.css";
import "@repo/ui/foundations.css";
import { themeClass } from "@repo/ui/foundations";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import Header from "@/common/components/header/header";
import { Toaster } from "@/common/components/toast";
import "../common/styles/reset.css";

export const metadata: Metadata = {
	title: "daruda",
	description: "대학생활에 필요한 툴을 다루다",
	icons: {
		icon: "/favicon.svg",
		shortcut: "/favicon.svg",
		apple: "/favicon.svg",
	},
};

export default function RootLayout({ children }: PropsWithChildren) {
	const isLoggedIn = true; // TODO: 로그인 상태 관리 로직 추가

	return (
		<html lang="ko" className={themeClass}>
			<body>
				<Header isLoggedIn={isLoggedIn} />
				<main>{children}</main>
				<Toaster />
			</body>
		</html>
	);
}
