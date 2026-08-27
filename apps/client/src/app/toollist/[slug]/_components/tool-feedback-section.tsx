import { ToolApi } from "@/common/api/tool-api";
import * as styles from "./styles/tool-feedback-section.css";
import { ToolLikeButton } from "./tool-like-button";

type Props = {
	toolId: number;
};
export const ToolFeedbackSection = async ({ toolId }: Props) => {
	const info = await ToolApi.getToolDetail(toolId);
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>내용이 도움이 되었나요?</h2>
			<p className={styles.description}>
				효율적인 세상을 만들기 위해 다루다가 항상 노력하고 있어요.
			</p>

			<ToolLikeButton
				toolId={toolId}
				initialLiked={info.isLiked}
				initialLikeCount={info.likeCount}
			/>
		</section>
	);
};
