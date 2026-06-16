import Image from "next/image";
import * as styles from "./styles/tool-feedback-section.css";

export const ToolFeedbackSection = () => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>내용이 도움이 되었나요?</h2>
			<p className={styles.description}>
				효율적인 세상을 만들기 위해 다루다가 항상 노력하고 있어요.
			</p>

			<button type="button" className={styles.button}>
				<div className={styles.buttonContent}>
					<Image src="/icons/ic_heart_iris500_20.svg" width={20} height={20} alt="하트 아이콘" />
					<span>도움이 되었어요</span>
				</div>
				<span className={styles.count}>1</span>
			</button>
		</section>
	);
};
