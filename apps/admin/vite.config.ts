import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const { VITE_API_BASE_URL } = loadEnv(mode, process.cwd(), "VITE_");

	if (!VITE_API_BASE_URL) {
		throw new Error("VITE_API_BASE_URL이 없습니다. apps/admin/.env를 확인하세요.");
	}

	// 프록시 대상은 .env 한 곳에서만 온다. 여기에 호스트를 박으면 .env와 어긋나도 알 수 없다.
	// 그래서 이 변수는 절대 URL이어야 한다. 상대 경로면 여기서 바로 터진다.
	const apiOrigin = new URL(VITE_API_BASE_URL).origin;

	return {
		plugins: [tsconfigPaths(), react(), vanillaExtractPlugin(), svgr()],
		resolve: {
			// dedupe가 없으면 @repo/ui/dist의 react import가 packages/ui/node_modules로
			// 해석돼 React가 두 벌 번들링된다. 이 앱의 사본 하나로 통일한다.
			dedupe: ["react", "react-dom"],
		},
		server: {
			// 지우면 브라우저가 api 서버를 직접 호출해 cross-site가 되고,
			// localhost 쿠키가 실리지 않아 로컬 로그인이 끊긴다.
			proxy: {
				"/api": {
					target: apiOrigin,
					changeOrigin: true,
					// Set-Cookie의 Domain을 localhost로 바꿔야 브라우저가 쿠키를 저장한다.
					cookieDomainRewrite: "localhost",
				},
			},
		},
	};
});
