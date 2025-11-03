import type { AxiosResponse } from "axios";
import { get, post } from "@/shared/api";
import type {
	AlternativeToolResponse,
	CoreFeatureResponse,
	DetailToolResponse,
	GetAdminToolsParams,
	GetAdminToolsRes,
	PostToolRequest,
	SearchTool,
	ToolPlanResponse,
} from "../model/types";

export const getAdminTools = async (params: GetAdminToolsParams): Promise<GetAdminToolsRes> => {
	const res: AxiosResponse<GetAdminToolsRes> = await get("/admin/tool", { params });
	return res.data;
};

export const postTool = async (data: PostToolRequest) => {
	const res: AxiosResponse<PostToolRequest> = await post("/admin", data);
	return res.data;
};

export const getSearchTool = async (keyword: string): Promise<SearchTool[]> => {
	const res: AxiosResponse<SearchTool[]> = await get(
		`/search/tool?keyword=${encodeURIComponent(keyword)}`
	);
	return res.data;
};

// 툴 세부정보 조회 get
export const getDetail = async (toolId: number): Promise<DetailToolResponse | null> => {
	try {
		const response: AxiosResponse<DetailToolResponse> = await get(`tool/${toolId}`);
		return response.data;
	} catch (error) {
		console.error("툴 상세 정보 조회 오류:", error);
		throw new Error("툴 상세정보 조회 실패");
	}
};

//  툴 핵심 기능 조회 get
export const getCoreFeature = async (toolId: number): Promise<CoreFeatureResponse | null> => {
	try {
		const response: AxiosResponse<CoreFeatureResponse> = await get(`tool/${toolId}/core-features`);
		return response.data;
	} catch (error) {
		console.error("핵심 기능 조회 오류:", error);
		return null;
	}
};

//  툴 플랜 조회 get
export const getPlan = async (toolId: number): Promise<ToolPlanResponse | null> => {
	try {
		const response: AxiosResponse<ToolPlanResponse> = await get(`tool/${toolId}/plans`);
		return response.data;
	} catch (error) {
		console.error("툴 플랜 조회 오류:", error);
		return null;
	}
};

// 대안 툴 조회 get
export const getAlternativeTool = async (
	toolId: number
): Promise<AlternativeToolResponse | null> => {
	try {
		const response: AxiosResponse<AlternativeToolResponse> = await get(
			`tool/${toolId}/alternatives`
		);
		return response.data;
	} catch (error) {
		console.error("대안 툴 조회 오류:", error);
		return null;
	}
};
