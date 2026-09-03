"use client";

import { useRouter } from "next/navigation";
import { deleteBoardAction, postBoardScrapAction } from "@/common/api/actions/board.actions";
import type { BoardItem } from "@/common/api/models/board.model";
import { MoreMenu, type MoreMenuItem } from "@/common/components/more-menu/more-menu";
import { toast } from "@/common/components/toast";
import { useCurrentUser } from "@/common/context/user-context";
import { useActionError } from "@/common/hooks/use-action-error";
import * as s from "./main-community-card.css";

interface Props {
	post: BoardItem;
	onClose: () => void;
	onReport: () => void;
}

/**
 * @note 메뉴는 열렸을 때만 그려집니다. 프로필을 기다리는 지점을 카드 본문 밖인 여기까지 미루려고 분리했습니다.
 */
export const MainCommunityMenu = ({ post, onClose, onReport }: Props) => {
	const currentUser = useCurrentUser();
	const router = useRouter();
	const handleActionError = useActionError();

	const isOwner = !!currentUser && post.author === currentUser.nickname;

	const ownerItems: MoreMenuItem[] = [
		{
			label: "수정하기",
			iconSrc: "/icons/community/ic_edit_20.svg",
			onClick: () => router.push(`/community/${post.boardId}/edit`),
		},
		{
			label: "삭제하기",
			iconSrc: "/icons/community/ic_delete_20.svg",
			onClick: async () => {
				const result = await deleteBoardAction({
					boardId: post.boardId,
					toolId: post.toolId || undefined,
				});
				if (result.success) {
					toast("게시글을 삭제했어요.");
					router.refresh();
				} else {
					toast(result.error || "삭제에 실패했어요.");
				}
			},
		},
	];

	const otherItems: MoreMenuItem[] = [
		{
			label: "저장하기",
			iconSrc: "/icons/community/ic_bookmark_20.svg",
			onClick: async () => {
				if (!currentUser) {
					router.push("/login");
					return;
				}
				const result = await postBoardScrapAction(post.boardId);
				if (result.success) {
					toast(result.data.scrap ? "게시글을 저장했어요." : "저장을 취소했어요.");
					router.refresh();
				} else {
					handleActionError(result, "저장에 실패했어요.");
				}
			},
		},
		{
			label: "신고하기",
			iconSrc: "/icons/community/ic_report_20.svg",
			onClick: onReport,
		},
	];

	return (
		<MoreMenu
			items={isOwner ? ownerItems : otherItems}
			onClose={onClose}
			className={s.dropdownCard}
		/>
	);
};
