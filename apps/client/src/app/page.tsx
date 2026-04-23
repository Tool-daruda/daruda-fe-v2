import { BtChipMainCategory } from "@/common/components/buttons/BtChipMainCategory";
import { BtMyPageCommunityButton } from "@/common/components/buttons/BtMyPageCommunity";
import { BtMyPageQuit } from "@/common/components/buttons/BtMyPageQuit";
import { BtMyPageSave } from "@/common/components/buttons/BtMyPageSave";
import { BtPopup } from "@/common/components/buttons/BtPopup";
import { BtSignUp } from "@/common/components/buttons/BtSignUp";
import { BtToolDetailFeedback } from "@/common/components/buttons/BtToolDetailFeedback";
import { BtToolDetailShare } from "@/common/components/buttons/BtToolDetailShare";
import { BtCommunityCmtSummit } from "../common/components/buttons/BtCommunityCmtSummit";
import { BtCommunityPostBookmark } from "../common/components/buttons/BtCommunityPostBookmark";
import { BtToolDetailBookmark } from "../common/components/buttons/BtToolDetailBookmark";
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
			<BtToolDetailFeedback state="default" count={1} />
			<BtToolDetailFeedback state="hover" count={5} />
			<BtToolDetailFeedback state="active" count={10} />
			<BtToolDetailBookmark state="default" />
			<BtToolDetailBookmark state="hover" />
			<BtToolDetailBookmark state="active" />
			<BtPopup variant="primary">버튼</BtPopup>
			<BtPopup variant="outline">버튼</BtPopup>
			<BtPopup variant="danger">네, 탈퇴할게요</BtPopup>
			<BtMyPageQuit state="default">탈퇴하기</BtMyPageQuit>
			<BtMyPageSave state="active" />
			<BtMyPageSave state="default" />
			<BtToolDetailShare state="default" />
			<BtToolDetailShare state="hover" />
			<BtSignUp state="default" />
			<BtSignUp state="active" />
			{/* 필요에 따라 더 많은 버튼을 추가할 수 있습니다. */}
		</h1>
	);
}
