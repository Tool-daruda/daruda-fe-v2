import type { ToolFeature } from "../_types";
import * as styles from "./styles/tool-feature-grid.css";

type Props = {
	features: ToolFeature[];
};

export const ToolFeatureGrid = ({ features }: Props) => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>이런 기능이 있어요</h2>

			<div className={styles.grid}>
				{features.map((feature) => {
					const number = String(feature.id).padStart(2, "0");

					return (
						<article key={feature.id} className={styles.card}>
							<div className={styles.cardHeader}>
								<p className={styles.number}>{number}</p>
								<h3 className={styles.cardTitle}>{feature.title}</h3>
							</div>
							<p className={styles.cardDescription}>{feature.description}</p>
						</article>
					);
				})}
			</div>
		</section>
	);
};
