import type { FromSpec, Schemas } from "@repo/api-types/helpers";

export type PositionType = NonNullable<Schemas["SignUpResponse"]["positions"]>;
export type SocialType = "KAKAO";

export type SignupReq = Schemas["SignUpRequest"];

// 소셜 로그인에서 이메일을 받아오므로 폼에서는 입력받지 않습니다.
export type SignupFormReq = Omit<SignupReq, "email">;

export type SignupData = FromSpec<"SignUpResponse">;

export type LoginData = FromSpec<"LoginResponse">;

export type ReissueData = FromSpec<"TokenResponse">;

export type UserProfileData = FromSpec<"MyProfileResponse">;
