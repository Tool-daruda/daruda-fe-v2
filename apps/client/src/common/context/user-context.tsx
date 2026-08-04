"use client";

import { createContext, useContext } from "react";
import type { UserProfileData } from "@/common/api/models/auth.model";

/**
 * @description 로그인한 사용자의 프로필을 담는 컨텍스트입니다.
 * @note 닉네임 등 프로필 필드가 실제로 필요한 서브트리(커뮤니티)에서만 사용합니다.
 * 단순히 로그인 여부만 필요하다면 루트에 있는 auth-context의 useIsLoggedIn을 쓰세요.
 */
const UserContext = createContext<UserProfileData | null>(null);

export const UserProvider = ({
	user,
	children,
}: {
	user: UserProfileData | null;
	children: React.ReactNode;
}) => <UserContext.Provider value={user}>{children}</UserContext.Provider>;

export const useCurrentUser = () => useContext(UserContext);
