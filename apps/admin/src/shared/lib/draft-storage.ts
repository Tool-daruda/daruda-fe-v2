import type { Tool } from "@/entities/tool";

const DRAFT_KEY_PREFIX = "tool_draft";
const DRAFT_TIMESTAMP_SUFFIX = "_timestamp";

const generateKey = (toolId?: string | number): string => {
	return toolId ? `${DRAFT_KEY_PREFIX}_${toolId}` : `${DRAFT_KEY_PREFIX}_new`;
};

const generateTimestampKey = (toolId?: string | number): string => {
	return `${generateKey(toolId)}${DRAFT_TIMESTAMP_SUFFIX}`;
};

const fileToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};

const sanitizeForStorage = async (data: Partial<Tool>): Promise<Partial<Tool>> => {
	const sanitized = { ...data };

	if (sanitized.toolLogo instanceof File) {
		sanitized.toolLogo = await fileToBase64(sanitized.toolLogo);
	}

	if (sanitized.images && Array.isArray(sanitized.images)) {
		const convertedImages = await Promise.all(
			sanitized.images.map(async (img) => {
				if (img instanceof File) {
					return await fileToBase64(img);
				}
				return img;
			})
		);
		sanitized.images = convertedImages;
	}

	return sanitized;
};

export const DraftStorage = {
	async saveDraft(data: Partial<Tool>, toolId?: string | number): Promise<void> {
		try {
			const key = generateKey(toolId);
			const timestampKey = generateTimestampKey(toolId);

			const sanitizedData = await sanitizeForStorage(data);

			localStorage.setItem(key, JSON.stringify(sanitizedData));
			localStorage.setItem(timestampKey, Date.now().toString());
		} catch (error) {
			console.error("임시저장 실패:", error);
		}
	},

	loadDraft(toolId?: string | number): Partial<Tool> | null {
		try {
			const key = generateKey(toolId);
			const saved = localStorage.getItem(key);

			if (!saved) return null;

			return JSON.parse(saved);
		} catch (error) {
			console.error("임시저장 데이터 불러오기 실패:", error);
			return null;
		}
	},

	clearDraft(toolId?: string | number): void {
		try {
			const key = generateKey(toolId);
			const timestampKey = generateTimestampKey(toolId);

			localStorage.removeItem(key);
			localStorage.removeItem(timestampKey);
		} catch (error) {
			console.error("임시저장 데이터 삭제 실패:", error);
		}
	},

	hasDraft(toolId?: string | number): boolean {
		const key = generateKey(toolId);
		return localStorage.getItem(key) !== null;
	},

	getDraftTimestamp(toolId?: string | number): number | null {
		try {
			const timestampKey = generateTimestampKey(toolId);
			const timestamp = localStorage.getItem(timestampKey);
			return timestamp ? Number(timestamp) : null;
		} catch (_e) {
			return null;
		}
	},

	mergeDraftWithServerData(serverData: Partial<Tool>, draftData: Partial<Tool>): Partial<Tool> {
		const merged = {
			...serverData,
			...draftData,
		};

		if (merged.relatedTools && Array.isArray(merged.relatedTools)) {
			merged.relatedToolIds = merged.relatedTools.map((tool) => tool.toolId);
		}

		return merged;
	},
};
