import type { AxiosResponse } from "axios";
import { get, post } from "@/shared/api";
import type { GetAdminToolsParams, GetAdminToolsRes, PostToolRequest } from "../model/types";

export const getAdminTools = async (params: GetAdminToolsParams): Promise<GetAdminToolsRes> => {
	const res: AxiosResponse<GetAdminToolsRes> = await get("/admin/tool", { params });
	return res.data;
};

export const postTool = async (data: PostToolRequest) => {
	const res: AxiosResponse<PostToolRequest> = await post("/admin", data);
	return res.data;
};
