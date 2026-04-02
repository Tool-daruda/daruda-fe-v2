import { BookmarkButton } from "../common/components/buttons/BookmarkButton";
import Client from "./client";
import { title } from "./page-style.css";

export default function Home() {
	return (
		<h1 className={title}>
			daruda
			<Client />
			<BookmarkButton state="filled" count={35} />
			<BookmarkButton state="subtle" count={12} />
		</h1>
	);
}
