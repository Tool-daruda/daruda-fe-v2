import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InputImage } from "./input-image";

const svgSquare = (text: string, color = "#8AB4F8") =>
	`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
    <rect width="120" height="120" rx="12" fill="${color}"/>
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
      font-family="sans-serif" font-size="20" fill="#fff">${text}</text>
  </svg>`;

const dataUri = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const meta: Meta<typeof InputImage> = {
	title: "Components/Input/InputImage",
	component: InputImage,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: `
- \`existingImages\`: 이미 서버에 존재하는 이미지(URL) 목록
- \`newImages\`: 새로 추가된 File 목록
- \`onImageChange(files)\`: 새 파일 배열을 전달
- \`onDeleteExisting(url)\`, \`onDeleteNew(file)\`: 각각 삭제 콜백
- \`onValidationError\`: 정책 위반 시 호출 (MAX_COUNT / MAX_SIZE / EMPTY)

`,
			},
		},
	},
	argTypes: {
		maxCount: { control: { type: "number", min: 1, step: 1 } },
		maxSizeMB: { control: { type: "number", min: 1, step: 1 } },
		accept: { control: "text" },
		disabled: { control: "boolean" },
		uploadAriaLabel: { control: "text" },
		removeAriaLabel: { control: "text" },
		className: { control: false },
		onValidationError: { action: "validationError" },
	},
	args: {
		maxCount: 5,
		maxSizeMB: 7,
		accept: "image/*",
		disabled: false,
		uploadAriaLabel: "이미지 업로드",
		removeAriaLabel: "이미지 삭제",
	},
};
export default meta;

type Story = StoryObj<typeof InputImage>;

export const Default: Story = {
	name: "Default",
	render: (args) => {
		const [existingImages, setExistingImages] = useState<string[]>([]);
		const [newImages, setNewImages] = useState<File[]>([]);

		return (
			<InputImage
				{...args}
				existingImages={existingImages}
				newImages={newImages}
				onImageChange={setNewImages}
				onDeleteExisting={(url) => setExistingImages((prev) => prev.filter((u) => u !== url))}
				onDeleteNew={(file) => setNewImages((prev) => prev.filter((f) => f !== file))}
				onValidationError={(err) => {
					alert(`[${err.type}] ${err.message}`);
				}}
			/>
		);
	},
};

export const WithExistingImages: Story = {
	name: "With existing images",
	render: (args) => {
		const [existingImages, setExistingImages] = useState<string[]>([
			dataUri(svgSquare("기존 이미지1", "#34A853")),
			dataUri(svgSquare("기존 이미지2", "#EA4335")),
		]);
		const [newImages, setNewImages] = useState<File[]>([]);

		return (
			<InputImage
				{...args}
				existingImages={existingImages}
				newImages={newImages}
				onImageChange={setNewImages}
				onDeleteExisting={(url) => setExistingImages((prev) => prev.filter((u) => u !== url))}
				onDeleteNew={(file) => setNewImages((prev) => prev.filter((f) => f !== file))}
			/>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"`existingImages`로 기존 이미지를 먼저 노출하고, 새로 추가되는 이미지는 `newImages`로 관리합니다.",
			},
		},
	},
};
