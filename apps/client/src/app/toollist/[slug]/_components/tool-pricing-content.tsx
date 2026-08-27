"use client";

import { useState } from "react";
import type { ToolPlanItem } from "@/common/api/models/tool.model";
import * as styles from "./styles/tool-pricing-section.css";

type Props = {
	toolPlans: ToolPlanItem[];
};

export const ToolPricingContent = ({ toolPlans }: Props) => {
	const hasMonthlyPlan = toolPlans.some((plan) => plan.priceMonthly !== null);
	const hasAnnualPlan = toolPlans.some((plan) => plan.priceAnnual !== null);

	const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
		hasMonthlyPlan ? "monthly" : "annual"
	);

	const visiblePlans = toolPlans.flatMap((plan) => {
		const currentPrice = billingPeriod === "monthly" ? plan.priceMonthly : plan.priceAnnual;
		return currentPrice === null ? [] : [{ plan, currentPrice }];
	});

	const periodPrefix = billingPeriod === "monthly" ? "월간" : "연간";
	const periodLabel = billingPeriod === "monthly" ? "월" : "연";

	return (
		<div className={styles.planGroup}>
			{hasMonthlyPlan && hasAnnualPlan && (
				<div className={styles.tabRow}>
					<button
						type="button"
						className={billingPeriod === "monthly" ? styles.activeTab : styles.tab}
						onClick={() => setBillingPeriod("monthly")}
					>
						월간
					</button>
					<span className={styles.tabDivider} />
					<button
						type="button"
						className={billingPeriod === "annual" ? styles.activeTab : styles.tab}
						onClick={() => setBillingPeriod("annual")}
					>
						연간
					</button>
				</div>
			)}

			<div className={styles.planList}>
				{visiblePlans.map(({ plan, currentPrice }) => {
					const featureItems = plan.description
						? plan.description.split("\n").filter((item) => item.trim() !== "")
						: [];

					return (
						<article key={plan.planId} className={styles.plan}>
							<div className={styles.planHeader}>
								<p className={styles.planName}>
									{currentPrice > 0 && `${periodPrefix} `}
									{plan.planName}
								</p>
								<p className={styles.planPrice}>
									{currentPrice === 0 ? (
										"무료 플랜"
									) : (
										<>
											{`${periodLabel} ${currentPrice.toLocaleString("ko-KR")}`}
											<span className={styles.priceCurrency}>₩</span>
										</>
									)}
								</p>
							</div>

							{featureItems.length > 0 && (
								<ul className={styles.featureList}>
									{featureItems.map((feature, idx) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: "API에서 고유한 ID를 제공하지 않는 경우에 한해 인덱스 사용 허용"
										<li key={idx} className={styles.featureItem}>
											{feature.replace(/^[•-\s]+/, "")}
										</li>
									))}
								</ul>
							)}
						</article>
					);
				})}
			</div>
		</div>
	);
};
