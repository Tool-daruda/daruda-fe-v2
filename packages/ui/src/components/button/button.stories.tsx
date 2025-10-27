import type { Meta, StoryObj } from "@storybook/react";
import IcAdd from "../../assets/icons/ic_add.svg?react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: { onClick: { action: "clicked" } },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		children: "저장하기",
		size: "lg",
		intent: "primary",
		appearance: "filled",
	},
};

export const Dangerous: Story = {
	args: {
		children: "삭제하기",
		size: "lg",
		intent: "dangerous",
		appearance: "filled",
	},
};

export const Tonal: Story = {
	args: {
		children: "편집",
		size: "sm",
		intent: "tonal",
	},
};

export const Pill: Story = {
	args: {
		children: "작성하기",
		size: "lg",
		intent: "primary",
		appearance: "filled",
		rounded: "pill",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		children: "버튼",
	},
};

export const Icon: Story = {
	args: {
		size: "icon",
		rounded: "pill",
		children: <IcAdd width={20} color="white" />,
	},
};
