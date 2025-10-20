import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { CheckboxGroup } from "./CheckboxGroup";

const meta: Meta<typeof Checkbox> = {
	title: "Components/Control/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: `
단일/다중 선택을 모두 지원하는 체크박스 컴포넌트입니다.

- **단독 사용**: boolean 플래그(예: "확인합니다").
- **그룹 사용**: 여러 옵션 중 다중 선택. 상태/유효성/접근성을 그룹 단위로 관리합니다.

`,
			},
		},
	},
	argTypes: {
		name: { control: "text", description: "단독 모드에서 폼 제출 name" },
		checked: { control: "boolean", description: "제어형 (단독)" },
		defaultChecked: { control: "boolean", description: "비제어형 초기값 (단독)" },
		indeterminate: { control: "boolean", description: "부분 선택 상태 (단독/상위 토글용)" },
		disabled: { control: "boolean" },
	},
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const SingleUncontrolled: Story = {
	name: "Single / Uncontrolled",
	args: {
		name: "agree",
		defaultChecked: false,
		children: "이용약관을 확인했습니다",
	},
	parameters: {
		docs: {
			description: {
				story: "가장 단순한 패턴으로 내부 state를 사용합니다. 폼 제출 시 `name` 값으로 전송됩니다.",
			},
		},
	},
};

export const SingleControlled: Story = {
	name: "Single / Controlled",
	render: (args) => {
		const [agree, setAgree] = useState(false);
		return (
			<Checkbox {...args} name="agree" checked={agree} onChange={setAgree}>
				이용약관에 동의합니다 ({agree ? "동의" : "미동의"})
			</Checkbox>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"`checked`와 `onChange`로 외부에서 상태를 완전히 제어합니다. 폼 라이브러리(RHF 등)와 결합 시 권장.",
			},
		},
	},
};

export const SingleIndeterminate: Story = {
	name: "Single / Indeterminate",
	args: {
		name: "selectAll",
		indeterminate: true,
		children: "일부 선택됨",
	},
	parameters: {
		docs: {
			description: {
				story:
					"`indeterminate`는 읽기 전용 시각 상태입니다. 상위/하위 항목의 선택 비율로 계산해 주입하세요.",
			},
		},
	},
};

export const GroupBasic: Story = {
	name: "Group / Basic",
	render: () => {
		const OPTIONS = [
			{ value: "ai", label: "AI" },
			{ value: "doc", label: "문서 작성&편집" },
			{ value: "design", label: "그래픽&디자인" },
		];
		const [skills, setSkills] = useState<string[]>(["ai"]);
		return (
			<CheckboxGroup name="skills" value={skills} onValueChange={setSkills}>
				{OPTIONS.map((o) => (
					<Checkbox key={o.value} value={o.value}>
						{o.label}
					</Checkbox>
				))}
			</CheckboxGroup>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"여러 항목을 하나의 질문으로 다룰 때 그룹을 사용하세요. 상태/유효성/접근성/폼 제출을 그룹 단위로 일관되게 관리합니다.",
			},
		},
	},
};

export const GroupWithSelectAll: Story = {
	name: "Group / With Select All",
	render: () => {
		const ALL = ["ai", "doc", "design"];
		const LABELS: Record<string, string> = {
			ai: "AI",
			doc: "문서 작성&편집",
			design: "그래픽&디자인",
		};
		const [skills, setSkills] = useState<string[]>(["ai"]);

		const allChecked = skills.length === ALL.length;
		const someChecked = skills.length > 0 && skills.length < ALL.length;

		return (
			<>
				<Checkbox
					name="selectAll"
					checked={allChecked}
					indeterminate={someChecked}
					onChange={(c) => setSkills(c ? ALL : [])}
				>
					전체 선택
				</Checkbox>

				<div style={{ height: 12 }} />

				<CheckboxGroup name="skills" value={skills} onValueChange={setSkills}>
					{ALL.map((v) => (
						<Checkbox key={v} value={v}>
							{LABELS[v]}
						</Checkbox>
					))}
				</CheckboxGroup>
			</>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"상위 체크박스는 `checked/indeterminate`를 하위 배열 길이로 계산해 표현합니다. 클릭 시 일괄 선택/해제를 수행합니다.",
			},
		},
	},
};

export const Disabled: Story = {
	name: "Disabled",
	render: () => (
		<>
			<CheckboxGroup name="skills" value={["ai"]} onValueChange={() => {}} disabled>
				<Checkbox value="ai">AI</Checkbox>
				<Checkbox value="doc">문서 작성&편집</Checkbox>
			</CheckboxGroup>
		</>
	),
	parameters: {
		docs: {
			description: {
				story:
					"그룹의 `disabled`는 하위 모든 항목에 전파됩니다. 단독도 `disabled`로 비활성화할 수 있습니다.",
			},
		},
	},
};
