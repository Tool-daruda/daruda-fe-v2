import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type React from "react";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			retry: 1,
		},
	},
});

interface Props {
	children: React.ReactNode;
}

export const QueryProvider = ({ children }: Props) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<div style={{ fontSize: "1.6rem" }}>
				<ReactQueryDevtools initialIsOpen={false} />
			</div>
		</QueryClientProvider>
	);
};
