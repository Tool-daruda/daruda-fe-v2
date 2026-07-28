"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { BoardItem } from "@/common/api/models/board.model";
import { MoreMenu, type MoreMenuItem } from "@/common/components/more-menu/more-menu";
import { useContentMenu } from "@/common/hooks/use-content-menu";
import { formatDate } from "@/common/utils";
import { deleteBoardAction } from "../../_actions/board-actions";
import { ReportModal } from "../../_components/report-modal/report-modal";
import * as s from "./styles/post-header.css";

interface PostHeaderProps {
	post: BoardItem;
}

export const PostHeader = ({ post }: PostHeaderProps) => {
	const router = useRouter();
	const { isOpen, toggle, close, containerRef, isOwner } = useContentMenu(post.author);
	const [reportOpen, setReportOpen] = useState(false);

	const ownerItems: MoreMenuItem[] = [
		{
			label: "수정하기",
			iconSrc: "/icons/community/ic_edit_20.svg",
			onClick: () => router.push(`/community/${post.boardId}/edit`),
		},
		{
			label: "삭제하기",
			iconSrc: "/icons/community/ic_delete_20.svg",
			onClick: async () => {
				const result = await deleteBoardAction({
					boardId: post.boardId,
					toolId: post.toolId || undefined,
				});
				if (result.success) router.push("/community");
				else alert(result.error || "삭제에 실패했습니다."); // TODO: 토스트 머지 후 교체
			},
		},
	];

	const otherItems: MoreMenuItem[] = [
		{
			label: "신고하기",
			iconSrc: "/icons/community/ic_report_20.svg",
			onClick: () => setReportOpen(true),
		},
	];

	return (
		<div className={s.wrapper}>
			{post.toolName && (
				<>
					<div className={s.toolBadge}>
						<div className={s.toolLogo}>
							{post.toolLogo && (
								<Image src={post.toolLogo} alt="" fill style={{ objectFit: "cover" }} />
							)}
						</div>
						<span className={s.toolName}>{post.toolName}</span>
					</div>

					<div className={s.divider} />
				</>
			)}

			<div className={s.titleRow}>
				<div className={s.titleBlock}>
					<h1 className={s.title}>{post.title}</h1>
					<div className={s.metaRow}>
						<span className={s.author}>{post.author}</span>
						<div className={s.metaDivider} />
						<span className={s.date}>{formatDate(post.updatedAt)}</span>
					</div>
				</div>

				<div ref={containerRef} className={s.menuWrapper}>
					<button
						type="button"
						className={s.etcButton}
						onClick={toggle}
						aria-label="더보기"
						aria-expanded={isOpen}
						aria-haspopup="menu"
					>
						<Image src="/icons/community/ic_etc_24.svg" alt="" width={20} height={5} />
					</button>
					{isOpen && (
						<MoreMenu
							items={isOwner ? ownerItems : otherItems}
							onClose={close}
							className={s.dropdown}
						/>
					)}
				</div>
			</div>

			<div className={s.divider} />

			<ReportModal
				isOpen={reportOpen}
				onClose={() => setReportOpen(false)}
				target={{ boardId: post.boardId, commentId: null }}
				content={post.title}
			/>
		</div>
	);
};
