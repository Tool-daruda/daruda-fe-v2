import { getCommunityFilterCategories } from "../_lib/get-filter-categories";
import { CommunityFilterSidebar } from "./community-filter-sidebar";

interface CommunityFilterSidebarFeedProps {
	selectedToolId?: number;
	isFreeOnly: boolean;
}

export const CommunityFilterSidebarFeed = async ({
	selectedToolId,
	isFreeOnly,
}: CommunityFilterSidebarFeedProps) => {
	const filterCategories = await getCommunityFilterCategories();
	return (
		<CommunityFilterSidebar
			categories={filterCategories}
			selectedToolId={selectedToolId}
			isFreeOnly={isFreeOnly}
		/>
	);
};
