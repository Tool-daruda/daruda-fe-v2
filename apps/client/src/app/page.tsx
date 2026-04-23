import { BtChipMainCategory } from "@/common/components/buttons/BtChipMainCategory";
import { BtMyPageCommunityButton } from "@/common/components/buttons/BtMyPageCommunity";
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
			<BtMyPageCommunityButton state="active" />
			<BtMyPageCommunityButton state="hover" />
			<BtMyPageCommunityButton state="default" />
			<BtChipMainCategory state="default">전체</BtChipMainCategory>
			<BtChipMainCategory state="hover">전체</BtChipMainCategory>
			<BtChipMainCategory state="active">전체</BtChipMainCategory>
			{/* 필요에 따라 더 많은 버튼을 추가할 수 있습니다. */}
		</h1>
	);
}
