import { BtCommunityPostBookmark } from "../common/components/buttons/BtCommunityPostBookmark";
import Client from "./client";
import { title } from "./page-style.css";

export default function Home() {
	return (
		<h1 className={title}>
			daruda
			<Client />
			<BtCommunityPostBookmark state="filled" count={35} />
			<BtCommunityPostBookmark state="subtle" count={12} />
		</h1>
	);
}
