import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TextField } from "./text-field";

const meta: Meta<typeof TextField> = {
	title: "Components/Input/TextField",
	component: TextField,
	tags: ["autodocs"],
	argTypes: {
		type: { control: "inline-radio", options: ["text", "search"] },
		size: { control: "inline-radio", options: ["xl", "s"] },
		disabled: { control: "boolean" },
		placeholder: { control: "text" },
		value: { control: false },
		className: { control: false },
		onChange: { action: "change" },
		onClear: { action: "clear" },
	},
	args: {
		type: "text",
		size: "xl",
		disabled: false,
		placeholder: "내용을 입력하세요",
	},
};
export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
	name: "Default",
	render: (args) => {
		const [val, setVal] = useState("");
		return (
			<div style={{ width: 440 }}>
				<TextField
					{...args}
					value={val}
					onChange={(e) => {
						setVal(e.currentTarget.value);
						args.onChange?.(e);
					}}
					onClear={() => {
						setVal("");
						args.onClear?.();
					}}
				/>
			</div>
		);
	},
};

export const Search: Story = {
	name: "Search",
	render: (args) => {
		const [q, setQ] = useState("");
		return (
			<div style={{ width: 440 }}>
				<TextField
					{...args}
					type="search"
					value={q}
					onChange={(e) => {
						setQ(e.currentTarget.value);
						args.onChange?.(e);
					}}
					placeholder="검색어를 입력하세요"
				/>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"`type='search'`일 때는 좌측에 검색 아이콘이 표시되고, 클리어 버튼은 나타나지 않습니다.",
			},
		},
	},
};

export const Disabled: Story = {
	name: "Disabled",
	render: (args) => (
		<div style={{ width: 440 }}>
			<TextField {...args} disabled defaultValue="작성 불가" />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: "`disabled`가 true면 입력 및 포커스가 비활성화됩니다.",
			},
		},
	},
};

export const SizeXL: Story = {
	args: {
		type: "text",
		size: "xl",
	},

	name: "Size XL",
	render: (args) => {
		const [val, setVal] = useState("");
		return (
			<TextField
				placeholder="size=xl (width: 424px)"
				{...args}
				value={val}
				onChange={(e) => {
					setVal(e.currentTarget.value);
					args.onChange?.(e);
				}}
				onClear={() => {
					setVal("");
					args.onClear?.();
				}}
			/>
		);
	},
};

export const SizeS: Story = {
	name: "Size S",
	args: {
		type: "text",
		size: "s",
	},
	render: (args) => {
		const [val, setVal] = useState("");
		return (
			<TextField
				placeholder="size=s (width: 194px)"
				{...args}
				value={val}
				onChange={(e) => {
					setVal(e.currentTarget.value);
					args.onChange?.(e);
				}}
				onClear={() => {
					setVal("");
					args.onClear?.();
				}}
			/>
		);
	},
};

export const ClearButton: Story = {
	name: "Clear button",
	render: (args) => {
		const [val, setVal] = useState("초기 텍스트");
		return (
			<div style={{ width: 440 }}>
				<TextField
					{...args}
					type="text"
					value={val}
					onChange={(e) => setVal(e.currentTarget.value)}
					onClear={() => setVal("")}
					placeholder="값이 있을 때 X 버튼이 나타납니다"
				/>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"`type='text'`에서만 동작합니다. 값이 존재하면 X 버튼이 노출되고, 클릭 시 `onClear`가 호출됩니다.",
			},
		},
	},
};
