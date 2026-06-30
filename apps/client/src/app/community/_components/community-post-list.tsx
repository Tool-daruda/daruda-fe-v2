import Image from "next/image";
import Link from "next/link";
import type { BoardItem, BoardSortBy } from "@/common/api/models/board.model";
import { formatDate } from "@/common/utils";
import { CommunitySortTabs } from "./community-sort-tabs";
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

const PostCard = ({ post }: { post: BoardItem }) => {
	return (
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
					</div>
				</div>
				{post.images[0] && (
					<div className={s.thumbnail}>
						<Image src={post.images[0]} alt={post.title} fill style={{ objectFit: "cover" }} />
					</div>
				)}
			</div>
		</Link>
	);
};
