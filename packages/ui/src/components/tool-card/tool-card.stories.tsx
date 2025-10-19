import type { Meta, StoryObj } from "@storybook/react";
import ToolCard from ".";

const meta: Meta<typeof ToolCard> = {
	title: "Components/ToolCard",
	component: ToolCard,
};

export default meta;

type Story = StoryObj<typeof ToolCard>;

export const Default: Story = {
	args: {},
};
