import type { components } from "./index";

export type Schemas = components["schemas"];

/**
 * 백엔드 swagger가 응답 DTO에 `required`를 내려주지 않아 생성 타입의 모든 필드가 optional로 나옵니다.
 * 그대로 쓰면 옵셔널 체이닝만 남으므로, 파생할 때 optional/nullable을 재귀적으로 벗겨냅니다.
 * 실제로 빠질 수 있는 필드는 `FromSpec`의 Override에 다시 적어 줍니다.
 */
export type DeepRequired<T> = T extends (infer U)[]
	? DeepRequired<U>[]
	: T extends object
		? { [K in keyof T]-?: DeepRequired<NonNullable<T[K]>> }
		: T;

/** 교차 타입을 단일 객체로 펼쳐 에디터 힌트를 읽기 좋게 만듭니다. */
type Flatten<T> = { [K in keyof T]: T[K] } & {};

/**
 * @description swagger 스키마에서 도메인 모델을 파생합니다.
 *
 * 필드 목록을 스펙에서 그대로 물려받으므로 **모델이 스펙과 어긋날 수 없습니다.**
 * 스펙에서 필드가 사라지거나 이름이 바뀌면 그 필드를 읽던 쪽이 바로 컴파일 에러가 납니다.
 *
 * `Override`에는 **스펙이 표현하지 못하는 것만** 적습니다.
 * 유니온 좁힘(`license`), 실제 nullable(`toolId: number | null`), 정말 빠질 수 있는 필드가 해당합니다.
 *
 * @example
 * type ToolSummary = FromSpec<"ToolResponse", { license: ApiLicenseType }>;
 */
export type FromSpec<K extends keyof Schemas, Override = Record<never, never>> = Flatten<
	Omit<DeepRequired<Schemas[K]>, keyof Override> & Override
>;

type MutuallyAssignable<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

/**
 * 두 타입의 필드 구성이 같으면 `true`.
 *
 * 파생할 수 없는 모델(런타임 검증이 필요해 zod로 쓴 admin 스키마 등)을 스펙과 대조할 때 씁니다.
 * `Expect<Matches<z.infer<typeof Schema>, Schemas["X"]>>` 형태로 선언합니다.
 */
export type Matches<Model, Spec> = MutuallyAssignable<DeepRequired<Model>, DeepRequired<Spec>>;

/**
 * 모델이 읽는 필드가 **전부 스펙에 있으면** `true`.
 *
 * 응답의 일부만 골라 쓰는 모델에 씁니다. 스펙에 필드가 새로 생기는 건 통과하지만,
 * 모델이 읽던 필드가 스펙에서 사라지거나 이름이 바뀌면 걸립니다. (그때 런타임이 깨지므로)
 */
export type SubsetOf<Model, Spec> = [DeepRequired<Spec>] extends [DeepRequired<Model>]
	? true
	: false;

/** 불일치하면 `false`를 `true`에 할당할 수 없어 타입 에러가 납니다. */
export type Expect<T extends true> = T;
