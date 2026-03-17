"use client";

import { Button } from "@repo/ui";
import useToast from "@/common/hooks/use-toast";

function Client() {
	const { showToast } = useToast();

	const handleClick = () => {
		showToast("공유 링크가 복사되었어요.");
	};

	return (
		<div>
			<Button
				size="lg"
				intent="primary"
				appearance="filled"
				rounded="rounded"
				onClick={handleClick}
			>
				버튼
			</Button>
		</div>
	);
}

export default Client;
