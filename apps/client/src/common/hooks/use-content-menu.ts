"use client";

import { useCurrentUser } from "@/common/context/user-context";
import { useMoreMenu } from "./use-more-menu";

export const useContentMenu = (authorNickname: string) => {
	const currentUser = useCurrentUser();
	const { isOpen, toggle, close, containerRef } = useMoreMenu();
	const isOwner = !!currentUser && authorNickname === currentUser.nickname;
	return { isOpen, toggle, close, containerRef, isOwner, currentUser };
};
