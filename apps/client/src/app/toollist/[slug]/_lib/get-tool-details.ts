import type { ToolDetail } from "../_types";
import { toolDetailMock } from "./tool-detail.mock";

export const getToolDetail = async (slug: string): Promise<ToolDetail | null> => {
	if (slug === toolDetailMock.slug) {
		return toolDetailMock;
	}

	return toolDetailMock;
};
