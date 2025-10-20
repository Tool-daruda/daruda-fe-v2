import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
	title: "Components/TextArea",
	component: TextArea,
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["xl"],
		},
		disabled: { control: "boolean" },
		placeholder: { control: "text" },
	},
};
export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
	name: "Default",
	render: (args) => {
		const [val, setVal] = useState("");
		return (
			<div style={{ width: 480 }}>
				<TextArea
					{...args}
					value={val}
					onChange={(e) => {
						setVal(e.currentTarget.value);
						args.onChange?.(e);
					}}
					placeholder="여기에 내용을 입력하세요"
					rows={4}
				/>
			</div>
		);
	},
};

export const Disabled: Story = {
	name: "Disabled",
	args: {
		disabled: true,
		defaultValue: "작성할 수 없습니다.",
		rows: 3,
	},
};
