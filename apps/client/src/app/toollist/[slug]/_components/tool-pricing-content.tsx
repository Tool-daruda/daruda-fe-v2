"use client";

import { useState } from "react";
import type { ToolPlanItem } from "@/common/api/models/tool.model";
import * as styles from "./styles/tool-pricing-section.css";

type Props = {
	toolPlans: ToolPlanItem[];
};

export const ToolPricingContent = ({ toolPlans }: Props) => {
	const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

	return (
		<>
			<div className={styles.tabRow}>
				<button
					type="button"
					className={billingPeriod === "monthly" ? styles.activeTab : styles.tab}
					onClick={() => setBillingPeriod("monthly")}
				>
					월간
				</button>
				<button
					type="button"
					className={billingPeriod === "annual" ? styles.activeTab : styles.tab}
					onClick={() => setBillingPeriod("annual")}
				>
					연간
				</button>
			</div>

			<div className={styles.planList}>
				{toolPlans.map((plan) => {
					const currentPrice = billingPeriod === "monthly" ? plan.priceMonthly : plan.priceAnnual;
					const priceText =
						currentPrice === 0 ? "무료" : `${currentPrice.toLocaleString("ko-KR")}₩`;
					const periodLabel = billingPeriod === "monthly" ? "월" : "연";

					const featureItems = plan.description
						? plan.description.split("\n").filter((item) => item.trim() !== "")
						: [];

					return (
						<article key={plan.planId} className={styles.plan}>
							<div className={styles.planHeader}>
								<h3 className={styles.planName}>
									{currentPrice > 0 && `${billingPeriod === "monthly" ? "월간 " : "연간 "}`}
									{plan.planName}
								</h3>
								<p className={styles.planPrice}>
									{currentPrice > 0 && `${periodLabel} `}
									{priceText}
								</p>
							</div>

							{featureItems.length > 0 && (
								<ul className={styles.featureList}>
									{featureItems.map((feature, idx) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: "API에서 고유한 ID를 제공하지 않는 경우에 한해 인덱스 사용 허용"
										<li key={idx} className={styles.featureItem}>
											• {feature.replace(/^[•-\s]+/, "")}
										</li>
									))}
								</ul>
							)}
						</article>
					);
				})}
			</div>
		</>
	);
};
