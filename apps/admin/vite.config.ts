import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
	plugins: [tsconfigPaths(), react(), vanillaExtractPlugin(), svgr()],
	resolve: {
		// dedupe가 없으면 @repo/ui/dist의 react import가 packages/ui/node_modules로
		// 해석돼 React가 두 벌 번들링된다. 이 앱의 사본 하나로 통일한다.
		dedupe: ["react", "react-dom"],
	},
	server: {
		// 이 프록시가 없으면 브라우저가 api 서버를 직접 호출해 cross-site가 된다.
		// 그러면 localhost 쿠키는 대상 도메인이 달라 요청에 실리지 않아 로컬 로그인이 끊긴다.
		proxy: {
			"/api": {
				target: "https://api.daruda.shop",
				changeOrigin: true,
				// Set-Cookie의 Domain을 localhost로 바꿔야 브라우저가 쿠키를 저장한다.
				cookieDomainRewrite: "localhost",
			},
		},
	},
});
