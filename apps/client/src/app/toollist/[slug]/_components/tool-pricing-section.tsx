import type { PricingPlan } from "../_types";
import * as styles from "./styles/tool-pricing-section.css";

type Props = {
	plans: PricingPlan[];
};

export const ToolPricingSection = ({ plans }: Props) => {
	return (
		<section className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>합리적인 플랜을 선택해 보세요</h2>
				<p className={styles.description}>자세한 내용은 플랜별 설명을 확인해 주세요.</p>
			</div>

			<div className={styles.tabRow}>
				<button type="button" className={styles.activeTab}>
					월간
				</button>
				<button type="button" className={styles.tab}>
					연간
				</button>
			</div>

			<div className={styles.planList}>
				{plans.map((plan) => {
					return (
						<article
							key={plan.id}
							className={plan.isRecommended ? styles.recommendedPlan : styles.plan}
						>
							<div className={styles.planHeader}>
								<h3 className={styles.planName}>{plan.name}</h3>
								<p className={styles.planPrice}>{plan.priceText}</p>
							</div>

							{plan.description ? (
								<p className={styles.planDescription}>{plan.description}</p>
							) : null}

							<ul className={styles.featureList}>
								{plan.features.map((feature) => {
									return (
										<li key={feature} className={styles.featureItem}>
											{feature}
										</li>
									);
								})}
							</ul>
						</article>
					);
				})}
			</div>
		</section>
	);
};
