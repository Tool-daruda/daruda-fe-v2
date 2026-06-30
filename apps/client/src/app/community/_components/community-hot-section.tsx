import Image from "next/image";
import Link from "next/link";
import type { CommunityHotPost } from "../_types";
import * as s from "./styles/community-hot-section.css";

interface CommunityHotSectionProps {
	hashtags: string[];
	posts: CommunityHotPost[];
}

export const CommunityHotSection = ({ hashtags, posts }: CommunityHotSectionProps) => {
	return (
		<section className={s.section}>
			<div className={s.headRow}>
				<div className={s.titleRow}>
					<Image src="/icons/ic_hot_24_red.svg" alt="" width={24} height={24} />
					<h2 className={s.title}>지금 가장 핫한 게시글</h2>
				</div>
				<div className={s.hashtagList}>
					{hashtags.map((tag) => (
						<span key={tag}>{tag}</span>
					))}
				</div>
			</div>

			<div className={s.cardGrid}>
				{posts.map((post) => (
					<Link key={post.boardId} href={`/community/${post.boardId}`} className={s.card}>
						<div className={s.thumbnailWrapper}>
							{post.thumbnailUrl && (
								<Image
									src={post.thumbnailUrl}
									alt={post.title}
									fill
									style={{ objectFit: "cover" }}
								/>
							)}
							<div className={s.badge} />
						</div>
						<div className={s.cardBody}>
							<p className={s.cardTitle}>{post.title}</p>
							<div className={s.metaRow}>
								<span>{post.author}</span>
								<div className={s.metaDivider} />
								<span>{post.date}</span>
							</div>
						</div>
					</Link>
				))}
			</div>

			<div className={s.divider} />
		</section>
	);
};
