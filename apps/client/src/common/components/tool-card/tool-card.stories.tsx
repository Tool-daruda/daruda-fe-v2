import type { Meta, StoryObj } from "@storybook/react";
import { ScrappedToolsProvider } from "@/common/context/scrap-context";
import ToolCard from "./tool-card";

const meta = {
	title: "Client/Components/ToolCard",
	component: ToolCard,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "radio",
			options: ["horizontal", "vertical"],
		},
		priceType: {
			control: "radio",
			options: ["free", "paid", "partial"],
		},
		badgeType: {
			control: "radio",
			options: ["hot", "new", undefined],
		},
	},
} satisfies Meta<typeof ToolCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = ["생산성", "AI", "디자인"];

const BOOKMARKED_TOOL_ID = 1;

const defaultArgs = {
	title: "Notion AI",
	description: "문서 작성과 요약, 아이디어 정리에 유용한 도구",
	thumbnailUrl: "/globe.svg",
	tags: tags.slice(0, 2),
	priceType: "partial" as const,
};

const decorators = {
	horizontal: [
		(Story: React.ElementType) => (
			<div style={{ maxWidth: 360, width: "100%" }}>
				<Story />
			</div>
		),
	],
	vertical: [
		(Story: React.ElementType) => (
			<div style={{ maxWidth: 188, width: "100%" }}>
				<Story />
			</div>
		),
	],
};

export const Horizontal: Story = {
	args: {
		...defaultArgs,
		variant: "horizontal",
	},
	decorators: decorators.horizontal,
};

export const HorizontalBookmarked: Story = {
	args: {
		...defaultArgs,
		toolId: BOOKMARKED_TOOL_ID,
		title: "Figma",
		description: "팀 기반 UI 디자인과 프로토타이핑 도구",
		thumbnailUrl: "/window.svg",
		priceType: "paid",
		variant: "horizontal",
	},
	decorators: [
		(Story: React.ElementType) => (
			<ScrappedToolsProvider idsPromise={Promise.resolve([BOOKMARKED_TOOL_ID])}>
				<Story />
			</ScrappedToolsProvider>
		),
		...decorators.horizontal,
	],
};

export const LongText: Story = {
	args: {
		...defaultArgs,
		title: "Adobe Lightroom Classic Extended University Plan",
		description: "사진 보정, 컬러 그레이딩, 프리셋 관리를 한 번에 처리하는 크리에이터용 워크플로우",
		tags,
		variant: "horizontal",
	},
	decorators: decorators.horizontal,
};

export const Vertical: Story = {
	args: {
		...defaultArgs,
		variant: "vertical",
	},
	decorators: decorators.vertical,
};

export const Hot: Story = {
	args: {
		...defaultArgs,
		title: "Cursor",
		thumbnailUrl: "/next.svg",
		badgeType: "hot",
		variant: "vertical",
	},
	decorators: decorators.vertical,
};

export const New: Story = {
	args: {
		...defaultArgs,
		title: "Gamma",
		thumbnailUrl: "/vercel.svg",
		priceType: "free",
		badgeType: "new",
		variant: "vertical",
	},
	decorators: decorators.vertical,
};
