import Image from "next/image";
import type { BoardItem } from "@/common/api/models/board.model";
import { formatDate } from "@/common/utils";
import * as s from "./styles/post-header.css";

interface PostHeaderProps {
	post: BoardItem;
}

export const PostHeader = ({ post }: PostHeaderProps) => {
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
				<button type="button" className={s.etcButton} aria-label="더보기">
					<Image src="/icons/community/ic_etc_24.svg" alt="" width={20} height={5} />
				</button>
			</div>

			<div className={s.divider} />
		</div>
	);
};
