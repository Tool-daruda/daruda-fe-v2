"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import type { BoardItem } from "@/common/api/models/board.model";
import { ReportModal } from "@/common/components/report-modal/report-modal";
import { useMoreMenu } from "@/common/hooks/use-more-menu";
import { formatDate } from "@/common/utils";
import * as s from "./main-community-card.css";
import { MainCommunityMenu } from "./main-community-menu";

export const MainCommunityCard = ({ post }: { post: BoardItem }) => {
	const { isOpen, toggle, close, containerRef } = useMoreMenu();
	const [reportOpen, setReportOpen] = useState(false);

	return (
		<div ref={containerRef} className={s.cardWrapper}>
			<Link href={`/community/${post.boardId}`} className={s.card}>
				<div className={s.cardHead}>
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
						<div className={s.divider} />
						<span>{formatDate(post.updatedAt)}</span>
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
							<div className={s.divider} />
							<span className={s.statItem}>
								<Image src="/svg/post/ic_bookmark_16.svg" alt="" width={16} height={16} />
								{post.scrapCount}회
							</span>
						</div>
					</div>
					{post.images?.[0] && (
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
				<Image src="/icons/community/ic_etc_28.svg" alt="" width={28} height={28} />
			</button>

			{isOpen && (
				<Suspense fallback={null}>
					<MainCommunityMenu post={post} onClose={close} onReport={() => setReportOpen(true)} />
				</Suspense>
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
