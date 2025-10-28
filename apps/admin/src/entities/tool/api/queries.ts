import { useQuery } from "@tanstack/react-query";
import type { GetAdminToolsParams } from "../model/types";
import { getAdminTools } from "./api";

export const toolKeys = {
	all: ["tools"] as const,
	adminList: (params: GetAdminToolsParams) => [...toolKeys.all, "adminList", params] as const,
};

export const useAdminTools = (params: GetAdminToolsParams) => {
	return useQuery({
		queryKey: toolKeys.adminList(params),
		queryFn: () => getAdminTools(params),
		placeholderData: (previousData) => previousData,
		staleTime: 1000 * 60 * 60,
	});
};
