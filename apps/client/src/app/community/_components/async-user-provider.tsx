"use client";

import { use } from "react";
import type { UserProfileData } from "@/common/api/models/auth.model";
import { UserProvider } from "@/common/context/user-context";

interface AsyncUserProviderProps {
	userPromise: Promise<UserProfileData | null>;
	children: React.ReactNode;
}

export function AsyncUserProvider({ userPromise, children }: AsyncUserProviderProps) {
	const user = use(userPromise);
	return <UserProvider user={user}>{children}</UserProvider>;
}
