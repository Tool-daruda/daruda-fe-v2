import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { GetAdminToolsParams, PostToolRequest, SearchTool } from "../model/types";
import {
	getAdminTools,
	getAlternativeTool,
	getCoreFeature,
	getDetail,
	getPlan,
	getSearchTool,
	patchTool,
	postTool,
} from "./api";

export const TOOL_QUERY_KEY = {
	all: ["tools"] as const,
	ADMIN_LIST: (params: GetAdminToolsParams) =>
		[...TOOL_QUERY_KEY.all, "adminList", params] as const,
	CORE_FEATURES: (coreID: number) => [...TOOL_QUERY_KEY.all, "corefeature", coreID],
	TOOL_PLAN: (planID: number) => [...TOOL_QUERY_KEY.all, "toolplan", planID],
	RELATED_TOOLS: (toolID: number) => [...TOOL_QUERY_KEY.all, "relatedtool", toolID],
	DETAIL: (toolId: number) => [...TOOL_QUERY_KEY.all, "tooldetail", toolId],
};

export const useAdminToolsQuery = (params: GetAdminToolsParams) => {
	return useQuery({
		queryKey: TOOL_QUERY_KEY.ADMIN_LIST(params),
		queryFn: () => getAdminTools(params),
		placeholderData: (previousData) => previousData,
		staleTime: 1000 * 60 * 60,
	});
};

export const SEARCH_QUERY_KEY = {
	SEARCH: (keyword: string, type: string) => ["search", type, keyword],
};

export const useSearchToolQuery = (keyword: string) => {
	return useQuery<SearchTool[]>({
		queryKey: SEARCH_QUERY_KEY.SEARCH(keyword, "tool"),
		queryFn: () => getSearchTool(keyword),
		enabled: !!keyword,
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 10,
	});
};

export const useToolPostMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (data: PostToolRequest) => postTool(data),
		onSuccess: () => {
			navigate("/tool");
		},
	});
};

export const useToolUpdateMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (req: { id: number | null; data: PostToolRequest }) => patchTool(req.data, req.id),
		onSuccess: () => {
			navigate("/tool");
		},
	});
};

// 툴 상세 정보 가져오기
export const useToolDetailQuery = (toolId: number) => {
	return useQuery({
		queryKey: TOOL_QUERY_KEY.DETAIL(toolId),
		queryFn: () => getDetail(toolId),
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60 * 24,
		enabled: !!toolId,
		retry: false,
	});
};

// 핵심 기능 조회하기
export const useCoreFeatureQuery = (toolId: number) => {
	return useQuery({
		queryKey: TOOL_QUERY_KEY.CORE_FEATURES(toolId),
		queryFn: () => getCoreFeature(toolId),
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60 * 24,
		enabled: !!toolId,
	});
};

// 툴 플랜(비용) 조회하기
export const usePlanQuery = (toolId: number) => {
	return useQuery({
		queryKey: TOOL_QUERY_KEY.TOOL_PLAN(toolId),
		queryFn: () => getPlan(toolId),
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60 * 24,
		enabled: !!toolId,
	});
};

// 대안 툴 조회하기
export const useAlternativeToolQuery = (toolId: number) => {
	return useQuery({
		queryKey: TOOL_QUERY_KEY.RELATED_TOOLS(toolId),
		queryFn: () => getAlternativeTool(toolId),
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60 * 24,
		enabled: !!toolId,
	});
};
