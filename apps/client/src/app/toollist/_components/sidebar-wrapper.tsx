"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CategoryRes } from "@/common/api/models/tool.model";
import { Sidebar } from "./sidebar";

interface SidebarWrapperProps {
	categories: CategoryRes[];
	currentCategory: string;
}

export const SidebarWrapper = ({ categories, currentCategory }: SidebarWrapperProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleSelectCategory = (categoryCode: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (categoryCode === "ALL") {
			params.delete("category");
		} else {
			params.set("category", categoryCode);
		}

		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<Sidebar
			categories={categories}
			selectedCategory={currentCategory}
			onSelectCategory={handleSelectCategory}
		/>
	);
};
