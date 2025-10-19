import type { Meta, StoryObj } from "@storybook/react";
import ToolCard from "./index";

const meta: Meta<typeof ToolCard> = {
	title: "Components/ToolCard",
	component: ToolCard,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToolCard>;

const tools = [
	{	
		toolId: 1,
		toolName: "Obsidian",
		toolLogo: "https://daruda.s3.ap-northeast-2.amazonaws.com/Obsidian.svg",
		description: "생각하는 방식에 적응하는 개인적이고 유연한 글쓰기 앱",
		category: "생산성",
		updatedAt: "2025.10.19",
	},
	{
		toolId: 2,
		toolName: "Mockup\nPhotos",
		toolLogo: "https://daruda.s3.ap-northeast-2.amazonaws.com/MockupPhotos.svg",
		description: "온라인에서 무료 목업을 제공하는 가장 큰 마켓플레이스",
		category: "목업",
		updatedAt: "2025.10.20",
	},
	{
		toolId: 3,
		toolName: "네이비즘 네이비즘 네이비즘 네이비즘 네이비즘 네이비즘 네이비즘",
		toolLogo:
		"https://daruda.s3.ap-northeast-2.amazonaws.com/%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%87%E1%85%B5%E1%84%8C%E1%85%B3%E1%86%B7.svg",
		description: "진리의 서버시간 진리의 서버시간 진리의 서버시간 진리의 서버시간 진리의 서버시간 진리의 서버시간 진리의 서버시간 진리의 서버시간 진리의 서버시간",
		category: "서버시간",
		updatedAt: "2025.10.18",
	},
];

export const Default: Story = {
	args: {
		toolId: 1,
		toolLogo: tools[0].toolLogo,
		toolName: tools[0].toolName,
		description: tools[0].description,
		category: tools[0].category,
		updatedAt: tools[0].updatedAt,
	},
};

export const MultipleCards: Story = {
	render: () => (
		<div
		style={{
			display: "flex",
			flexDirection: "column",
			gap: "16px",
			background: "#FCFCFC",
			justifyContent: "center",
			alignItems: "center",
			padding: "2em 0",
		}}
		>
		{tools.map((tool) => (
			<ToolCard
			key={tool.toolId}
			toolId={tool.toolId}
			toolLogo={tool.toolLogo}
			toolName={tool.toolName}
			description={tool.description}
			category={tool.category}
			updatedAt={tool.updatedAt}
			/>
		))}
		</div>
	),
};
