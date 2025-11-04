import { Link, NavLink } from "react-router-dom";
import IcLogo from "@/shared/assets/icons/ic_darudalogo.svg?react";
import * as S from "./index.css";

const Header = () => {
	return (
		<header className={S.headerStyle}>
			<div className={S.logoStyle}>
				<IcLogo />
				ADMIN
			</div>
			<nav className={S.navStyle}>
				<NavLink to="/tool" className={S.linkStyle}>
					툴
				</NavLink>
				<NavLink to="/user" className={S.linkStyle}>
					유저
				</NavLink>
				<NavLink to="/board" className={S.linkStyle}>
					게시글
				</NavLink>
				<NavLink to="/notice" className={S.linkStyle}>
					공지
				</NavLink>
			</nav>
			<Link to="/tool/new" className={`${S.linkStyle} ${S.primaryLink}`}>
				툴 추가하기
			</Link>
		</header>
	);
};

export default Header;
