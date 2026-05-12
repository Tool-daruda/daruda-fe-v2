import Image from "next/image";
import * as s from "./styles/search-bar.css";

export const SearchBar = () => {
	return (
		<header className={s.container}>
			<h1 className={s.title}>daruda 툴 리스트</h1>
			<div className={s.inputWrapper}>
				<input type="text" placeholder="툴과 관련된 정보를 찾아드려요" className={s.input} />
				<span className={s.searchIcon}>
					<Image src="/icons/ic_search_iris300_20.svg" alt="Search Icon" width={20} height={20} />
				</span>
			</div>
		</header>
	);
};
