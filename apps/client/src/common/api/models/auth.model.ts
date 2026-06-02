export type PositionType = "STUDENT" | "WORKER" | "NORMAL" | "ADMIN";
export type SocialType = "KAKAO";

export interface SignupReq {
	nickname: string;
	email: string;
	positions: string;
}

export interface SignupData {
	userId: number;
	nickname: string;
	email: string;
	positions: PositionType;
}

export interface LoginData {
	isUser: boolean;
	userId: number;
	nickname: string;
	email: string;
	positions: PositionType;
}

export interface ReissueData {
	accessToken: string;
}

export interface UserProfileData {
	userId: number;
	nickname: string;
	positions: "STUDENT" | "WORKER" | "NORMAL" | "ADMIN";
}
