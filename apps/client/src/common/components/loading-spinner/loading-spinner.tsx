import { forwardRef } from "react";
import * as styles from "./loading-spinner.css";

interface LoadingSentinelProps {
	isLoading: boolean;
}

export const LoadingSentinel = forwardRef<HTMLDivElement, LoadingSentinelProps>(
	({ isLoading }, ref) => (
		<div ref={ref} className={styles.loadingTrigger}>
			{isLoading && <div className={styles.spinner} />}
		</div>
	)
);

LoadingSentinel.displayName = "LoadingSentinel";
