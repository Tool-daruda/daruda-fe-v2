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
			<Image src="/icons/ic_share_24.svg" alt="공유" width={24} height={24} />
		</button>
	);
};
