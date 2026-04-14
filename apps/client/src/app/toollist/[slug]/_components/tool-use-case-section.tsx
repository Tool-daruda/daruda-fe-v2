import Image from "next/image";
import type { UseCaseCard } from "../_types";
import * as styles from "./styles/tool-use-case-section.css";

type Props = {
	useCases: UseCaseCard[];
};

export const ToolUseCaseSection = ({ useCases }: Props) => {
	return (
		<section className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>이렇게 활용해 보세요</h2>
			</div>

			<div className={styles.grid}>
				{useCases.map((useCase) => (
					<article key={useCase.id} className={styles.card}>
						<div className={styles.thumbnail}>
							<Image
								src={useCase.thumbnailUrl}
								alt={useCase.title}
								fill
								className={styles.thumbnailImage}
							/>
						</div>

						<div className={styles.content}>
							<h3 className={styles.cardTitle}>{useCase.title}</h3>
							<p className={styles.summary}>{useCase.summary}</p>
							<p className={styles.author}>{useCase.author}</p>
						</div>
					</article>
				))}
			</div>
		</section>
	);
};
