"use client";

import { createContext, use, useContext } from "react";
import type { UserProfileData } from "@/common/api/models/auth.model";

type ContextUser = UserProfileData | null;

/**
 * @description 로그인한 사용자의 프로필을 담는 컨텍스트입니다.
 * @note 닉네임 등 프로필 필드가 실제로 필요한 서브트리(커뮤니티)에서만 사용합니다.
 * 단순히 로그인 여부만 필요하다면 루트에 있는 auth-context의 useIsLoggedIn을 쓰세요.
 */
const UserContext = createContext<ContextUser | Promise<ContextUser>>(null);

export const UserProvider = ({
	user,
	children,
}: {
	/** 프로필 조회를 기다리지 않고 화면을 먼저 그리려면 프로미스를 그대로 넘깁니다. */
	user: ContextUser | Promise<ContextUser>;
	children: React.ReactNode;
}) => <UserContext.Provider value={user}>{children}</UserContext.Provider>;

/**
 * @note 프로바이더가 프로미스를 받았다면 풀릴 때까지 서스펜드합니다. `<Suspense>` 안에서 써야 합니다.
 */
export const useCurrentUser = (): ContextUser => {
	const value = useContext(UserContext);

	return value instanceof Promise ? use(value) : value;
};
