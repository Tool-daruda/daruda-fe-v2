import { Outlet } from "react-router-dom";
import * as S from "./admin-layout.css";

export const AdminLayout = () => {
	return (
		<div className="admin-container">
			<header className="admin-header">{/* 헤더 */}</header>
			<main className={S.content}>
				<Outlet />
			</main>
		</div>
	);
};
