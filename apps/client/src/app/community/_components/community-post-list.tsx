"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { CommunityListPost, CommunitySortType } from "../_types";
import * as s from "./styles/community-post-list.css";

interface CommunityPostListProps {
	posts: CommunityListPost[];
}

const SORT_OPTIONS: { value: CommunitySortType; label: string }[] = [
	{ value: "latest", label: "최신순" },
	{ value: "scrap", label: "스크랩순" },
];

export const CommunityPostList = ({ posts }: CommunityPostListProps) => {
	// TODO(api): 정렬 기준 변경 시 BoardApi 호출로 교체됩니다. 현재는 목데이터라 순서가 바뀌지 않습니다.
	const [sort, setSort] = useState<CommunitySortType>("latest");

	return (
		<div className={s.wrapper}>
			<div className={s.sortRow}>
				{SORT_OPTIONS.map((option, index) => (
					<div key={option.value} className={s.sortRow}>
						{index > 0 && <div className={s.sortDivider} />}
						<button
							type="button"
							className={s.sortItem}
							data-active={sort === option.value ? "true" : "false"}
							onClick={() => setSort(option.value)}
						>
							{option.label}
						</button>
					</div>
				))}
			</div>

			{posts.length === 0 ? (
				<p className={s.emptyState}>등록된 게시글이 없습니다.</p>
			) : (
				<div className={s.list}>
					{posts.map((post, index) => (
						<div key={post.boardId} className={s.list}>
							{index > 0 && <div className={s.itemDivider} />}
							<PostCard post={post} />
						</div>
					))}
				</div>
			)}
		</div>
	);
};

const PostCard = ({ post }: { post: CommunityListPost }) => {
	return (
		<Link href={`/community/${post.boardId}`} className={s.card}>
			<div className={s.cardHead}>
				<div className={s.cardHeadLeft}>
					<div className={s.toolChip}>
						<div className={s.toolLogo} />
						<span className={s.toolName}>{post.toolName}</span>
					</div>
					<div className={s.metaRow}>
						<span>{post.author}</span>
						<div className={s.metaDivider} />
						<span>{post.date}</span>
					</div>
				</div>
				<button
					type="button"
					className={s.etcButton}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
					aria-label="더보기"
				>
					<Image src="/icons/community/ic_etc_20.svg" alt="" width={20} height={4} />
				</button>
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
						<div className={s.statDivider} />
						<span className={s.statItem}>
							<Image src="/svg/post/ic_bookmark_16.svg" alt="" width={16} height={16} />
							{post.scrapCount}회
						</span>
					</div>
				</div>
				<div className={s.thumbnail}>
					{post.thumbnailUrl && (
						<Image src={post.thumbnailUrl} alt={post.title} fill style={{ objectFit: "cover" }} />
					)}
				</div>
			</div>
		</Link>
	);
};
