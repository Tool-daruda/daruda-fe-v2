"use client";

import type { AlternativeTool } from "@/common/api/models/tool.model";
import ToolCard from "@/common/components/tool-card/tool-card";
import { type ApiLicenseType, LICENSE_MAP } from "@/common/constants/price";

type Props = {
	relatedTools: AlternativeTool[];
};

export const ToolAlternativesList = ({ relatedTools }: Props) => {
	const handleBookmarkClick = (toolName: string) => {
		console.log(`${toolName} 북마크 클릭`);
	};

	return (
		<>
			{relatedTools.map((tool) => {
				const backendLicense = tool.license as ApiLicenseType;
				const mappedPriceType = LICENSE_MAP[backendLicense] ?? undefined;

				return (
					<li key={tool.toolId}>
						<ToolCard
							title={tool.toolName}
							thumbnailUrl={tool.toolLogo}
							tags={tool.keywords}
							priceType={mappedPriceType}
							variant="vertical"
							href={`/toollist/${tool.toolId}`}
							onBookmarkClick={() => handleBookmarkClick(tool.toolName)}
						/>
					</li>
				);
			})}
		</>
	);
};
