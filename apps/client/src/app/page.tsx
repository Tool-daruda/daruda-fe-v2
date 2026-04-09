import { BtCommunityCmtSummit } from "../common/components/buttons/BtCommunityCmtSummit";
import { BtCommunityPostBookmark } from "../common/components/buttons/BtCommunityPostBookmark";
import Client from "./client";
import { title } from "./page-style.css";

export default function Home() {
	return (
		<h1 className={title}>
			daruda
			<Client />
			<BtCommunityPostBookmark state="active" count={35} />
			<BtCommunityPostBookmark state="default" count={12} />
			<BtCommunityCmtSummit state="active" />
			<BtCommunityCmtSummit state="default" />
		</h1>
	);
}
