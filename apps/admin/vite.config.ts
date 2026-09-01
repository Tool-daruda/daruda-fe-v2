import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// 지우면 브라우저가 api 서버를 직접 호출해 cross-site가 되고,
// localhost 쿠키가 실리지 않아 로컬 로그인이 끊긴다.
function createApiProxy(baseUrl: string | undefined) {
	if (!baseUrl) {
		throw new Error("VITE_API_BASE_URL이 없습니다. apps/admin/.env를 확인하세요.");
	}

	return {
		// 대상 호스트는 .env 한 곳에서만 온다. 여기에 박으면 .env와 어긋나도 알 수 없다.
		target: new URL(baseUrl).origin,
		changeOrigin: true,
		// Set-Cookie의 Domain을 localhost로 바꿔야 브라우저가 쿠키를 저장한다.
		cookieDomainRewrite: "localhost",
	};
}

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
	const { VITE_API_BASE_URL } = loadEnv(mode, process.cwd(), "VITE_");

	return {
		plugins: [tsconfigPaths(), react(), vanillaExtractPlugin(), svgr()],
		resolve: {
			// dedupe가 없으면 @repo/ui/dist의 react import가 packages/ui/node_modules로
			// 해석돼 React가 두 벌 번들링된다. 이 앱의 사본 하나로 통일한다.
			dedupe: ["react", "react-dom"],
		},
		server: {
			// 프록시는 dev 서버에서만 동작하므로 빌드에서는 VITE_API_BASE_URL을 요구하지 않는다.
			// (CI 빌드는 컴파일 확인용이라 .env가 없다)
			proxy: command === "serve" ? { "/api": createApiProxy(VITE_API_BASE_URL) } : undefined,
		},
	};
});
