import "@repo/ui/index.css";
import "@repo/ui/foundations.css";
import { themeClass } from "@repo/ui/foundations";
import type { Preview } from "@storybook/react";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<div className={themeClass}>
				<Story />
			</div>
		),
	],
};

export default preview;
