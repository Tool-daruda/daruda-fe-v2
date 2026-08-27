"use client";

import type { AlternativeTool } from "@/common/api/models/tool.model";
import ToolCard from "@/common/components/tool-card/tool-card";
import { type ApiLicenseType, LICENSE_MAP } from "@/common/constants/price";

type Props = {
	relatedTools: AlternativeTool[];
};

export const ToolAlternativesList = ({ relatedTools }: Props) => {
	return (
		<>
			{relatedTools.map((tool) => {
				const backendLicense = tool.license as ApiLicenseType;
				const mappedPriceType = LICENSE_MAP[backendLicense] ?? undefined;

				return (
					<li key={tool.toolId}>
						<ToolCard
							toolId={tool.toolId}
							title={tool.toolName}
							thumbnailUrl={tool.toolLogo}
							tags={tool.keywords}
							priceType={mappedPriceType}
							variant="alternative"
							href={`/toollist/${tool.toolId}`}
						/>
					</li>
				);
			})}
		</>
	);
};
