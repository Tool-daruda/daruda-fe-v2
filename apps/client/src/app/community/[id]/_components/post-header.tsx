import Image from "next/image";
import type { PostDetail } from "../_types";
import * as s from "./styles/post-header.css";

interface PostHeaderProps {
	post: PostDetail;
}

export const PostHeader = ({ post }: PostHeaderProps) => {
	return (
		<div className={s.wrapper}>
			<div className={s.toolBadge}>
				<div className={s.toolLogo} />
				<span className={s.toolName}>{post.tool.toolName}</span>
			</div>

			<div className={s.divider} />

			<div className={s.titleRow}>
				<div className={s.titleBlock}>
					<h1 className={s.title}>{post.title}</h1>
					<div className={s.metaRow}>
						<span className={s.author}>{post.author}</span>
						<div className={s.metaDivider} />
						<span className={s.date}>{post.date}</span>
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
