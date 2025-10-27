import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio } from "./radio";
import { RadioGroup } from "./radio-group";

const meta: Meta<typeof Radio> = {
	title: "Components/Control/Radio",
	component: Radio,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: `
**Radio**는 반드시 **RadioGroup** 안에서 사용하세요. <br />
같은 \`name\`을 공유하는 아이템 중 하나만 선택됩니다. <br />
\`label[data-state="checked"]\` 셀렉터를 활용해 선택 상태를 커스텀하세요.
`,
			},
		},
	},
	argTypes: {
		value: { control: "text", description: "해당 라디오 아이템의 값" },
		disabled: { control: "boolean" },
	},
};
export default meta;

type Story = StoryObj<typeof Radio>;

export const Defualt: Story = {
	name: "Defualt",
	render: () => {
		const OPTIONS = [
			{ value: "ai", label: "AI" },
			{ value: "doc", label: "문서 작성&편집" },
			{ value: "design", label: "그래픽&디자인" },
		];
		const [selected, setSelected] = useState("ai");

		return (
			<RadioGroup name="category" value={selected} onValueChange={setSelected}>
				{OPTIONS.map((o) => (
					<Radio key={o.value} value={o.value}>
						{o.label}
					</Radio>
				))}
			</RadioGroup>
		);
	},
	parameters: {
		docs: {
			description: {
				story: "같은 그룹 안에서 하나만 선택됩니다. `onValueChange`로 외부 상태와 동기화하세요.",
			},
		},
	},
};

export const Disabled: Story = {
	name: "Disabled",
	render: () => {
		const [selected, setSelected] = useState("ai");
		return (
			<RadioGroup name="category" value={selected} onValueChange={setSelected}>
				<Radio value="ai">AI</Radio>
				<Radio value="doc" disabled>
					문서 작성&편집
				</Radio>
				<Radio value="design">그래픽&디자인</Radio>
			</RadioGroup>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"`disabled`가 지정된 항목은 포커스/선택이 불가능합니다. 그룹 레벨의 `disabled`가 있다면 하위 전부에 전파하도록 구현할 수 있습니다.",
			},
		},
	},
};
