"use client";

import { createContext, useContext } from "react";
import type { UserProfileData } from "@/common/api/models/auth.model";
import { NotificationProvider } from "./notification-context";

const UserContext = createContext<UserProfileData | null>(null);

export const UserProvider = ({
	user,
	children,
}: {
	user: UserProfileData | null;
	children: React.ReactNode;
}) => (
	<UserContext.Provider value={user}>
		<NotificationProvider>{children}</NotificationProvider>
	</UserContext.Provider>
);

export const useCurrentUser = () => useContext(UserContext);
