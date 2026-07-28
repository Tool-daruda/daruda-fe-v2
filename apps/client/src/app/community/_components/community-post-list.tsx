"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { BoardItem, BoardSortBy } from "@/common/api/models/board.model";
import { MoreMenu, type MoreMenuItem } from "@/common/components/more-menu/more-menu";
import { useContentMenu } from "@/common/hooks/use-content-menu";
import { formatDate } from "@/common/utils";
import { deleteBoardAction, postBoardScrapAction } from "../_actions/board-actions";
import { CommunitySortTabs } from "./community-sort-tabs";
import { ReportModal } from "./report-modal/report-modal";
import * as s from "./styles/community-post-list.css";

interface CommunityPostListProps {
	posts: BoardItem[];
	sortBy: BoardSortBy;
}

export const CommunityPostList = ({ posts, sortBy }: CommunityPostListProps) => {
	return (
		<div className={s.wrapper}>
			<CommunitySortTabs sortBy={sortBy} />

			{posts.length === 0 ? (
				<p className={s.emptyState}>등록된 게시글이 없습니다.</p>
			) : (
				<div className={s.list}>
					{posts.map((post, index) => (
						<div key={post.boardId}>
							{index > 0 && <div className={s.itemDivider} />}
							<PostCard post={post} />
						</div>
					))}
				</div>
			)}
		</div>
	);
};

const PostCard = ({ post }: { post: BoardItem }) => {
	const router = useRouter();
	const { isOpen, toggle, close, containerRef, isOwner, currentUser } = useContentMenu(post.author);
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
				// TODO: 토스트 머지 후 에러 피드백 교체
				const result = await deleteBoardAction({
					boardId: post.boardId,
					toolId: post.toolId || undefined,
				});
				if (result.success) router.refresh();
				else alert(result.error || "삭제에 실패했습니다.");
			},
		},
	];

	const otherItems: MoreMenuItem[] = [
		{
			label: "저장하기",
			iconSrc: "/icons/community/ic_bookmark_20.svg",
			onClick: async () => {
				if (!currentUser) {
					router.push("/login");
					return;
				}
				// TODO: 토스트 머지 후 에러 피드백 교체
				const result = await postBoardScrapAction(post.boardId);
				if (result.success) router.refresh();
				else alert(result.error || "저장에 실패했습니다.");
			},
		},
		{
			label: "신고하기",
			iconSrc: "/icons/community/ic_report_20.svg",
			onClick: () => setReportOpen(true),
		},
	];

	return (
		<div ref={containerRef} className={s.cardWrapper}>
			<Link href={`/community/${post.boardId}`} className={s.card}>
				<div className={s.cardHead}>
					<div className={s.cardHeadLeft}>
						{post.toolName && (
							<div className={s.toolChip}>
								<div className={s.toolLogo}>
									{post.toolLogo && (
										<Image src={post.toolLogo} alt="" fill style={{ objectFit: "cover" }} />
									)}
								</div>
								<span className={s.toolName}>{post.toolName}</span>
							</div>
						)}
						<div className={s.metaRow}>
							<span>{post.author}</span>
							<div className={s.metaDivider} />
							<span>{formatDate(post.updatedAt)}</span>
						</div>
					</div>
				</div>

				<div className={s.cardBody}>
					<div className={s.cardBodyLeft}>
						<div className={s.textBlock}>
							<p className={s.cardTitle}>{post.title}</p>
							<p className={s.cardContent}>{post.content}</p>
						</div>
						<div className={s.statsRow}>
							<span className={s.statItem}>
								<Image src="/svg/post/ic_comment_16.svg" alt="" width={16} height={16} />
								{post.commentCount}개
							</span>
						</div>
					</div>
					{post.images[0] && (
						<div className={s.thumbnail}>
							<Image src={post.images[0]} alt={post.title} fill style={{ objectFit: "cover" }} />
						</div>
					)}
				</div>
			</Link>

			<button
				type="button"
				className={s.etcButton}
				onClick={toggle}
				aria-label="더보기"
				aria-expanded={isOpen}
				aria-haspopup="menu"
			>
				<Image src="/icons/community/ic_etc_20.svg" alt="" width={20} height={4} />
			</button>

			{isOpen && (
				<MoreMenu
					items={isOwner ? ownerItems : otherItems}
					onClose={close}
					className={s.dropdownCard}
				/>
			)}

			<ReportModal
				isOpen={reportOpen}
				onClose={() => setReportOpen(false)}
				target={{ boardId: post.boardId, commentId: null }}
				content={post.title}
			/>
		</div>
	);
};
