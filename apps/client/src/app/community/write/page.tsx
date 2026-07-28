import { PostForm } from "../_components/post-form/post-form";
import { getCommunityFilterCategories } from "../_lib/get-filter-categories";

export default async function CommunityWritePage() {
	const categories = await getCommunityFilterCategories();
	const tools = categories.flatMap((category) => category.tools);

	return <PostForm mode="create" tools={tools} />;
}
