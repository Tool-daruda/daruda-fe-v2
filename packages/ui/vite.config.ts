import path from "node:path";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [vanillaExtractPlugin()],
	build: {
		lib: {
			entry: {
				index: path.resolve(__dirname, "src/index.ts"),
				foundations: path.resolve(__dirname, "src/foundations/index.ts"),
			},
			formats: ["es"],
			fileName: (_format, entryName) => `${entryName}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom", "@vanilla-extract/css"],
			output: {
				preserveModules: false,
				exports: "named",
			},
		},
		outDir: "dist",
		emptyOutDir: false,
	},
});
