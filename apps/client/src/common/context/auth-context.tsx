"use client";

import { createContext, useContext } from "react";

/**
 * @description 로그인 여부만 담는 전역 컨텍스트입니다.
 * @note 값은 루트 레이아웃에서 쿠키 존재 여부로 판정하므로 프로필 API 호출이 필요하지 않습니다.
 * 프로필 필드(닉네임 등)가 필요한 화면은 해당 서브트리에서 별도로 조회하세요.
 */
const AuthContext = createContext(false);

export const AuthProvider = ({
	isLoggedIn,
	children,
}: {
	isLoggedIn: boolean;
	children: React.ReactNode;
}) => <AuthContext.Provider value={isLoggedIn}>{children}</AuthContext.Provider>;

export const useIsLoggedIn = () => useContext(AuthContext);
