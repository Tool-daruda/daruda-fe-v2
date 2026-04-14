import * as styles from "./styles/tool-feedback-section.css";

export const ToolFeedbackSection = () => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>내용이 도움이 되었나요?</h2>
			<p className={styles.description}>소개글이 서비스 이해에 도움이 되었는지 알려주세요.</p>

			<button type="button" className={styles.button}>
				💜 도움이 되었어요
				<p>1</p>
			</button>
		</section>
	);
};
