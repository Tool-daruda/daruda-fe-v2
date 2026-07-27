"use client";

import { createContext, useContext } from "react";
import type { UserProfileData } from "@/common/api/models/auth.model";

const UserContext = createContext<UserProfileData | null>(null);

export const UserProvider = ({
	user,
	children,
}: {
	user: UserProfileData | null;
	children: React.ReactNode;
}) => <UserContext.Provider value={user}>{children}</UserContext.Provider>;

export const useCurrentUser = () => useContext(UserContext);
