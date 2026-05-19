import { dirname, join, resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

function getAbsolutePath(value: string): string {
	return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	staticDirs: ["../public"],
	addons: [getAbsolutePath("@storybook/addon-essentials")],
	framework: {
		name: getAbsolutePath("@storybook/react-vite"),
		options: {},
	},
	viteFinal: async (config) => {
		config.resolve = {
			...config.resolve,
			alias: {
				...config.resolve?.alias,
				"@": resolve(__dirname, "../src"),
			},
		};

		config.define = {
			...config.define,
			"process.env": {},
		};

		config.plugins = [...(config.plugins ?? []), vanillaExtractPlugin()];
		return config;
	},
};

export default config;
