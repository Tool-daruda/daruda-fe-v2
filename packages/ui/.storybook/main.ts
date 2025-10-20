import { dirname, join } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";
import svgr from "vite-plugin-svgr";

function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		getAbsolutePath("@storybook/addon-essentials"),
		getAbsolutePath("@storybook/addon-onboarding"),
		getAbsolutePath("@chromatic-com/storybook"),
		getAbsolutePath("@storybook/experimental-addon-test"),
	],
	framework: {
		name: getAbsolutePath("@storybook/react-vite"),
		options: {},
	},
	viteFinal: async (config) => {
		config.plugins?.push(svgr());
		return config;
	},
};
export default config;
