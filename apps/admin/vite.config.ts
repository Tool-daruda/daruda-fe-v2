import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
	plugins: [tsconfigPaths(), react(), vanillaExtractPlugin(), svgr()],
	resolve: {
		// @repo/ui/dist의 react import가 packages/ui/node_modules로 해석되어
		// 번들에 React가 두 벌 들어가는 것을 방지
		dedupe: ["react", "react-dom"],
	},
});
