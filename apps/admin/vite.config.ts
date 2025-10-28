import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), vanillaExtractPlugin(), tsconfigPaths(), svgr()],
	server: {
		proxy: {
			"/api": {
				target: "https://api.daruda.shop",
				changeOrigin: true,
			},
		},
	},
});
