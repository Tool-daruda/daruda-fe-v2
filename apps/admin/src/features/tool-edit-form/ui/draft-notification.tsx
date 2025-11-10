import { Button } from "@repo/ui";
import { useState } from "react";
import * as S from "./tool-edit-form.css";

interface DraftNotificationProps {
	timestamp: number;
	onRestore: () => void;
	onDiscard: () => void;
}

export const DraftNotification = ({ timestamp, onRestore, onDiscard }: DraftNotificationProps) => {
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) return null;

	const formattedDate = new Date(timestamp).toLocaleString("ko-KR", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});

	const handleRestore = () => {
		onRestore();
		setIsVisible(false);
	};

	const handleDiscard = () => {
		onDiscard();
		setIsVisible(false);
	};

	return (
		<section className={S.notiStyle}>
			<div>
				<p>임시저장된 데이터가 있습니다</p>
				<p>{formattedDate}에 저장된 데이터를 불러오시겠습니까?</p>
			</div>
			<div style={{ display: "flex", justifyContent: "end", gap: "8px" }}>
				<Button
					type="button"
					size="lg"
					intent="dangerous"
					appearance="outlined"
					onClick={handleDiscard}
				>
					삭제하기
				</Button>
				<Button
					type="button"
					size="lg"
					intent="primary"
					appearance="filled"
					onClick={handleRestore}
				>
					불러오기
				</Button>
			</div>
		</section>
	);
};
