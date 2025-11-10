import { Link, NavLink } from "react-router-dom";
import IcLogo from "@/shared/assets/icons/ic_darudalogo.svg?react";
import * as S from "./index.css";

const NAV_ITEMS = [
	{ to: "/tool", label: "툴" },
	{ to: "/user", label: "유저" },
	{ to: "/board", label: "게시글" },
	{ to: "/notice", label: "공지" },
] as const;

const Header = () => {
	return (
		<header className={S.headerStyle}>
			<div className={S.logoStyle}>
				<IcLogo aria-label="다루다 로고" role="img" />
				ADMIN
			</div>
			<nav className={S.navStyle}>
				{NAV_ITEMS.map(({ to, label }) => (
					<NavLink key={to} to={to} className={S.linkStyle}>
						{label}
					</NavLink>
				))}
			</nav>
			<Link to="/tool/new" className={`${S.linkStyle} ${S.primaryLink}`}>
				툴 추가하기
			</Link>
		</header>
	);
};

export default Header;
