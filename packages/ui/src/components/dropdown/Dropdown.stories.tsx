import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Dropdown } from "./Dropdown";
import type { Option } from "./Dropdown.types";

const OPTIONS: Option[] = [
	{ label: "AI", value: "ai" },
	{ label: "문서 작성&편집", value: "document" },
	{ label: "프레젠테이션", value: "presentation" },
	{ label: "협업&커뮤니케이션", value: "communication" },
	{ label: "데이터", value: "data" },
	{ label: "그래픽&디자인", value: "design" },
];

const meta: Meta<typeof Dropdown> = {
	title: "Components/Dropdown",
	component: Dropdown,
	tags: ["autodocs"],
	argTypes: {
		options: { control: false },
		value: { control: "text", description: "현재 선택된 value(제어형)" },
		placeholder: { control: "text" },
		disabled: { control: "boolean" },
		maxHeight: {
			control: { type: "number", min: 0, step: 1 },
			description: "보여줄 **행 수**. 0 또는 미지정이면 전체 표시",
		},
		className: { control: "text" },
		onChange: { action: "changed" },
	},
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Defualt: Story = {
	name: "Defualt",
	render: (args) => {
		const [value, setValue] = useState<string | undefined>(undefined);
		return (
			<div style={{ width: 320 }}>
				<Dropdown
					{...args}
					options={OPTIONS}
					value={value}
					onChange={(opt) => {
						setValue(opt.value);
						args.onChange?.(opt);
					}}
					placeholder="내용을 입력하세요"
				/>
			</div>
		);
	},
};

export const Disabled: Story = {
	name: "Disabled",
	render: () => {
		const [value, setValue] = useState<string | undefined>("ai");
		return (
			<div style={{ width: 320 }}>
				<Dropdown
					options={OPTIONS}
					value={value}
					onChange={(opt) => setValue(opt.value)}
					disabled
				/>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: "`disabled`가 true면 트리거 및 옵션 선택이 비활성화됩니다.",
			},
		},
	},
};

export const withMaxHeight: Story = {
	name: "Max height",
	render: () => {
		const [value, setValue] = useState<string | undefined>();
		return (
			<div style={{ width: 320 }}>
				<Dropdown
					options={OPTIONS}
					value={value}
					onChange={(opt) => setValue(opt.value)}
					placeholder="3개만 보이고 스크롤"
					maxHeight={3}
				/>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"3으로 maxHeight를 지정하면 3행만 보이도록 컨테이너 높이를 제한하고, 나머지는 스크롤 됩니다.",
			},
		},
	},
};

export const LongList: Story = {
	name: "Long list (maxHeight=5)",
	render: () => {
		const longOptions: Option[] = Array.from({ length: 20 }, (_, i) => ({
			label: `옵션 ${i + 1}`,
			value: `v${i + 1}`,
		}));
		const [value, setValue] = useState<string | undefined>();
		return (
			<div style={{ width: 320 }}>
				<Dropdown
					options={longOptions}
					value={value}
					onChange={(opt) => setValue(opt.value)}
					placeholder="긴 리스트 예시"
					maxHeight={5}
				/>
			</div>
		);
	},
};

export const WithInitialValue: Story = {
	name: "With initial value",
	render: () => {
		const [value, setValue] = useState<string | undefined>("document");
		return (
			<div style={{ width: 320 }}>
				<Dropdown
					options={OPTIONS}
					value={value}
					onChange={(opt) => setValue(opt.value)}
					placeholder="선택하세요"
				/>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"외부 상태로 초기 선택값을 주입할 수 있습니다. `value`가 없을 때만 `placeholder`가 보입니다.",
			},
		},
	},
};
