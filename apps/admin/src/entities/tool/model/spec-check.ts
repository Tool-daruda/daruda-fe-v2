import type { Expect, Matches, Schemas, SubsetOf } from "@repo/api-types/helpers";
import type { BlogResponse, CoreFeatureResponse } from "./types";

/**
 * @description zod 스키마가 swagger 스펙과 맞는지 컴파일 타임에 대조합니다.
 *
 * client는 스펙에서 타입을 파생하지만(`FromSpec`), admin은 응답을 zod로 런타임 검증하므로
 * 스키마를 손으로 유지합니다. 대신 여기서 대조해 스펙 변경을 놓치지 않게 합니다.
 * 런타임 코드는 만들지 않습니다.
 *
 * admin은 응답의 일부만 골라 읽으므로 대부분 `SubsetOf`로 봅니다.
 * 스펙에 필드가 늘어나는 건 통과하고, **읽던 필드가 사라지면** 걸립니다.
 *
 * 아래 두 스키마는 스펙이 표현하지 못하는 차이가 있어 대조하지 않습니다.
 * - `ToolPlanResponseSchema` — 화면에서 계산해 붙이는 `price`·`isDollar`를 함께 담습니다.
 * - `AlternativeToolSchema` — 스펙상 string인 `license`를 한글 라벨 유니온으로 좁힙니다.
 */

export type _CoreFeatureResponse = Expect<
	Matches<CoreFeatureResponse, Schemas["ToolCoreListResponse"]>
>;
export type _BlogResponse = Expect<SubsetOf<BlogResponse, Schemas["ToolBlogListResponse"]>>;

/**
 * 아래 세 건은 백엔드 확인이 끝나면 주석을 풀어 다시 대조합니다.
 *
 * 1. `DetailToolResponseSchema.fontColor` — 스펙에 없는 필드를 필수로 파싱하고 있습니다.
 *    구 스펙에도 없었으니 이번 변경과 무관한 기존 누락입니다.
 *    서버가 실제로 내려주는지, 스펙에 빠진 건지 확인이 필요합니다.
 *
 * 2. `ToolCardTypeSchema.category` / `.createdAt` — 이번 스펙에서 사라졌습니다.
 *    `Res` → `Response` 일괄 리네임 과정에서 admin 목록용 `ToolRes`가
 *    client 목록용 `ToolResponse`와 이름이 겹쳐 덮인 것으로 보입니다.
 *    스펙 버그라면 스펙을 다시 받아야 하고, 실제 DTO 통합이라면 목록 UI를 고쳐야 합니다.
 *
 * 3. `GetAdminToolsResSchema` — 2번을 품고 있어 같이 걸립니다.
 */
// export type _DetailToolResponse = Expect<
// 	SubsetOf<DetailToolResponse, Schemas["ToolDetailGetResponse"]>
// >;
// export type _ToolCardType = Expect<SubsetOf<ToolCardType, Schemas["ToolResponse"]>>;
// export type _GetAdminToolsRes = Expect<
// 	SubsetOf<GetAdminToolsRes, Schemas["AdminToolPageResponse"]>
// >;
