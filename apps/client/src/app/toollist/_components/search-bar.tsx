import Image from "next/image";
import * as s from "./styles/search-bar.css";

export const SearchBar = () => {
	return (
		<header className={s.container}>
			<Image
				src="/icons/img_bg_darudalogo_228.png"
				alt="Decorative Image"
				width={214}
				height={228}
				className={s.decorativeImage}
				priority
			/>

			<h2 className={s.subTitle}>지금 내게 필요한 디지털 툴을 모아보다</h2>
			<h1 className={s.title}>daruda 툴 리스트</h1>

			<form action="/search" method="GET" className={s.inputWrapper}>
				<input type="hidden" name="tab" value="tool" />
				<input
					type="text"
					name="keyword"
					placeholder="툴과 관련된 정보를 찾아드려요"
					className={s.input}
					required
				/>

				<button
					type="submit"
					className={s.searchIcon}
					style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
				>
					<Image src="/icons/ic_search_iris300_20.svg" alt="Search Icon" width={20} height={20} />
				</button>
			</form>
		</header>
	);
};
