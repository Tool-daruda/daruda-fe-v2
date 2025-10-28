import type { AxiosResponse } from "axios";
import { get } from "@/shared/api";
import type { GetAdminToolsParams, GetAdminToolsRes } from "../model/types";

export const getAdminTools = async (params: GetAdminToolsParams): Promise<GetAdminToolsRes> => {
	const res: AxiosResponse<GetAdminToolsRes> = await get("/admin/tool", { params });
	return res.data;
};
