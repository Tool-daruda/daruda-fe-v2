import type { Expect, Matches, Schemas, SubsetOf } from "@repo/api-types/helpers";
import type { BlogResponse, CoreFeatureResponse } from "./types";

/**
 * @description zod 스키마를 swagger 스펙과 대조한다. 타입 전용 파일이라 런타임 코드는 없다.
 *
 * 일부러 빼 둔 것 — `ToolPlanResponseSchema`(화면에서 계산해 붙이는 `price`·`isDollar`),
 * `AlternativeToolSchema`(스펙상 string인 `license`를 한글 라벨로 좁힘).
 */

export type _CoreFeatureResponse = Expect<
	Matches<CoreFeatureResponse, Schemas["ToolCoreListResponse"]>
>;
export type _BlogResponse = Expect<SubsetOf<BlogResponse, Schemas["ToolBlogListResponse"]>>;

/**
 * TODO: 스펙과 모델이 어긋난 것들. 스펙 버그인지 모델 버그인지 확인 후 제거.
 *
 * - `fontColor` — 스펙에 없는 필드를 필수로 파싱 중. 구 스펙에도 없던 기존 누락.
 * - `category` / `createdAt` — `Res` → `Response` 리네임에서 admin 목록용 `ToolRes`가
 *   client 목록용 `ToolResponse`에 덮여 사라졌다. 스펙 버그인지 실제 DTO 통합인지 확인 필요.
 */
// export type _DetailToolResponse = Expect<
// 	SubsetOf<DetailToolResponse, Schemas["ToolDetailGetResponse"]>
// >;
// export type _ToolCardType = Expect<SubsetOf<ToolCardType, Schemas["ToolResponse"]>>;
// export type _GetAdminToolsRes = Expect<
// 	SubsetOf<GetAdminToolsRes, Schemas["AdminToolPageResponse"]>
// >;
