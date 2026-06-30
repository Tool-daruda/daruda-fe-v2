import Link from "next/link";
import * as s from "./section-header.css";

type Props = {
	icon: string;
	title: string;
	moreHref: string;
};

export const SectionHeader = ({ icon, title, moreHref }: Props) => {
	return (
		<div className={s.container}>
			<h2 className={s.title}>
				<span>{icon}</span>
				{title}
			</h2>
			<Link href={moreHref} className={s.moreLink}>
				더보기
			</Link>
		</div>
	);
};
