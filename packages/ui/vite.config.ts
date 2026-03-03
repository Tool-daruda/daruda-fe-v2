import path from "node:path";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	plugins: [
		vanillaExtractPlugin({ identifiers: "short" }),
		svgr(),
		dts({ insertTypesEntry: true }),
	],
	build: {
		cssMinify: false,
		lib: {
			entry: {
				index: path.resolve(__dirname, "src/index.ts"),
				foundations: path.resolve(__dirname, "src/foundations/index.ts"),
			},
			formats: ["es"],
			fileName: (_format, entryName) => `${entryName}.js`,
		},
		rollupOptions: {
			external: [
				"react",
				"react-dom",
				"@vanilla-extract/css",
				"react/jsx-runtime",
				"react/jsx-dev-runtime",
			],
			output: {
				preserveModules: false,
				exports: "named",
				// JS는 무조건 .js
				entryFileNames: "[name].js",
				chunkFileNames: "[name]-[hash].js",

				// asset(=css, 이미지 등)만 여기로. CSS만 .css로 고정
				assetFileNames: (assetInfo) => {
					if (assetInfo.name?.endsWith(".css")) return "[name].css";
					return "[name]-[hash][extname]";
				},
			},
		},
		outDir: "dist",
		emptyOutDir: false,
		cssCodeSplit: true,
	},
});
