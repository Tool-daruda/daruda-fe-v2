import Image from "next/image";
import Link from "next/link";
import * as s from "./section-header.css";

type Props = {
	iconSrc: string;
	title: string;
	moreHref: string;
};

export const SectionHeader = ({ iconSrc, title, moreHref }: Props) => {
	return (
		<div className={s.container}>
			<h2 className={s.title}>
				<Image src={iconSrc} alt="" width={24} height={24} />
				{title}
			</h2>
			<Link href={moreHref} className={s.moreLink}>
				더보기
			</Link>
		</div>
	);
};
