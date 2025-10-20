import type { Preview } from "@storybook/react";
import { themeClass } from "../src/foundations";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
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
