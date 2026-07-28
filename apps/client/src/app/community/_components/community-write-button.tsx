import Image from "next/image";
import Link from "next/link";
import * as s from "./styles/community-write-button.css";

export const CommunityWriteButton = () => {
	return (
		<Link href="/community/write" className={s.button} aria-label="글 작성하기">
			<Image src="/icons/community/ic_write_24.svg" alt="" width={24} height={24} />
		</Link>
	);
};
