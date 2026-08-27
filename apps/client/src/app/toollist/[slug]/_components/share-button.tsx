"use client";

import Image from "next/image";
import { toast } from "@/common/components/toast";
import * as styles from "./styles/tool-meta-bar.css";

export const ShareButton = () => {
	const handleShare = async () => {
		const shareUrl = `${window.location.origin}${window.location.pathname}`;

		try {
			await navigator.clipboard.writeText(shareUrl);
			toast("공유 링크가 복사되었어요.");
		} catch {
			toast("링크 복사에 실패했어요. 다시 시도해주세요.");
		}
	};

	return (
		<button className={styles.iconButton} type="button" aria-label="공유" onClick={handleShare}>
			<span className={styles.iconSwap}>
				<Image
					src="/icons/tool/ic_share_iris300_20.svg"
					alt=""
					width={14}
					height={19}
					className={styles.iconDefault}
				/>
				<Image
					src="/icons/tool/ic_share_iris400_20.svg"
					alt=""
					width={14}
					height={19}
					className={styles.iconHovered}
				/>
			</span>
		</button>
	);
};
