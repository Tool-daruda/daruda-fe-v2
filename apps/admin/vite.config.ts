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
});
