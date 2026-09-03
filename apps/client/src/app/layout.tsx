import "./global.css";
import "@repo/ui/index.css";
import "@repo/ui/foundations.css";
import { themeClass } from "@repo/ui/foundations";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { hasAuthSession } from "@/common/api/auth-session";
import DevAuthPanel from "@/common/components/dev-auth/dev-auth-panel";
import Footer from "@/common/components/footer/footer";
import Header from "@/common/components/header/header";
import { ModalHost } from "@/common/components/modal";
import ScrollToTop from "@/common/components/scroll-to-top/scroll-to-top";
import { Toaster } from "@/common/components/toast";
import { AuthProvider } from "@/common/context/auth-context";
import { NotificationProvider } from "@/common/context/notification-context";
import { ScrappedToolsProvider } from "@/common/context/scrap-context";
import "../common/styles/reset.css";

export const metadata: Metadata = {
	title: "daruda",
	description: "대학생활에 필요한 툴을 다루다",
	icons: {
		icon: "/icons/ic_logo_20.svg",
		shortcut: "/icons/ic_logo_20.svg",
		apple: "/icons/ic_logo_20.svg",
	},
};

export default async function RootLayout({ children }: PropsWithChildren) {
	const isLoggedIn = await hasAuthSession();

	return (
		<html lang="ko" className={themeClass}>
			<body>
				<AuthProvider isLoggedIn={isLoggedIn}>
					<NotificationProvider>
						<ScrappedToolsProvider>
							<ScrollToTop />
							<Header isLoggedIn={isLoggedIn} />
							<main>{children}</main>
							<Footer />
							<Toaster />
							<ModalHost />
							{process.env.NODE_ENV !== "production" && <DevAuthPanel isLoggedIn={isLoggedIn} />}
						</ScrappedToolsProvider>
					</NotificationProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
