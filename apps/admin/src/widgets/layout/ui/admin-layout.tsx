import { Outlet } from "react-router-dom";
import Header from "@/shared/ui/header";
import * as S from "./admin-layout.css";

export const AdminLayout = () => {
	return (
		<div className="admin-container">
			<Header />
			<main className={S.content}>
				<Outlet />
			</main>
		</div>
	);
};
