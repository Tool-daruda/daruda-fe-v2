"use client";
import { Button } from "@repo/ui";
import ToolCard from "@/common/components/tool-card/tool-card";

export default function ClientPage() {
	return (
		<div
			style={{
				padding: "40px",
				display: "flex",
				flexDirection: "column",
				gap: "48px",
			}}
		>
			<div>
				<Button size="lg" intent="primary" appearance="filled" rounded="rounded">
					버튼
				</Button>
			</div>

			<section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
				<h2>Horizontal</h2>

				<ToolCard
					title="Adobe Lightroom Classic"
					description="우리의 지갑을 털어가는 툴입니다..."
					tags={[
						{ id: "1", label: "데이터" },
						{ id: "2", label: "그래픽디자인" },
					]}
					priceType="free"
					variant="horizontal"
				/>

				<ToolCard
					title="Adobe Lightroom Classic"
					description="우리의 지갑을 털어가는 툴입니다..."
					tags={[
						{ id: "1", label: "데이터" },
						{ id: "2", label: "그래픽디자인" },
					]}
					priceType="paid"
					isBookmarked={true}
					variant="horizontal"
				/>
				<ToolCard
					title="Notion AI"
					description="문서 작성과 요약, 아이디어 정리에 유용한 도구"
					thumbnailUrl="/images/sample-tool-thumbnail.png"
					tags={[
						{ id: "1", label: "생산성" },
						{ id: "2", label: "문서" },
					]}
					priceType="free"
					isBookmarked={false}
					variant="horizontal"
					href="/tools/notion-ai"
				/>
			</section>

			<section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
				<h2>Vertical</h2>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
						gap: "20px",
					}}
				>
					<ToolCard
						title="Adobe Lightroom Classic"
						tags={[
							{ id: "1", label: "데이터" },
							{ id: "2", label: "그래픽디자인" },
						]}
						priceType="free"
						variant="vertical"
					/>

					<ToolCard
						title="Adobe Lightroom Classic"
						tags={[
							{ id: "1", label: "데이터" },
							{ id: "2", label: "그래픽디자인" },
						]}
						priceType="paid"
						isBookmarked={true}
						variant="vertical"
					/>

					<ToolCard
						title="Adobe Lightroom Classic"
						tags={[
							{ id: "1", label: "데이터" },
							{ id: "2", label: "그래픽디자인" },
						]}
						priceType="partial"
						isHot={true}
						variant="vertical"
					/>

					<ToolCard
						title="Notion AI"
						thumbnailUrl="/images/sample-tool-thumbnail.png"
						tags={[
							{ id: "1", label: "생산성" },
							{ id: "2", label: "문서" },
						]}
						priceType="free"
						variant="vertical"
						href="/tools/notion-ai"
					/>

					<ToolCard
						title="Figma"
						thumbnailUrl="/images/sample-tool-thumbnail.png"
						tags={[
							{ id: "1", label: "디자인" },
							{ id: "2", label: "협업" },
						]}
						priceType="paid"
						isBookmarked={true}
						isHot={true}
						variant="vertical"
						href="/tools/figma"
					/>

					<ToolCard
						title="Cursor"
						thumbnailUrl="/images/sample-tool-thumbnail.png"
						tags={[
							{ id: "1", label: "개발" },
							{ id: "2", label: "AI" },
						]}
						priceType="partial"
						isBookmarked={false}
						isNew={true}
						variant="vertical"
						href="/tools/cursor"
					/>
				</div>
			</section>
		</div>
	);
}
