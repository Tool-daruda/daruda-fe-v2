import type { components } from "./index";

export type Schemas = components["schemas"];

/** 백엔드가 응답 DTO에 `required`를 안 내려줘 전 필드가 optional로 생성된다. 그걸 벗겨낸다. */
export type DeepRequired<T> = T extends (infer U)[]
	? DeepRequired<U>[]
	: T extends object
		? { [K in keyof T]-?: DeepRequired<NonNullable<T[K]>> }
		: T;

/** 교차 타입을 단일 객체로 펼쳐 에디터 힌트를 읽기 좋게 만든다. */
type Flatten<T> = { [K in keyof T]: T[K] } & {};

/**
 * swagger 스키마에서 도메인 모델을 파생한다. `Override`에는 스펙이 표현하지 못하는 것만 적는다.
 *
 * @example
 * type ToolSummary = FromSpec<"ToolResponse", { license: ApiLicenseType }>;
 */
export type FromSpec<K extends keyof Schemas, Override = Record<never, never>> = Flatten<
	Omit<DeepRequired<Schemas[K]>, keyof Override> & Override
>;

type MutuallyAssignable<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

/** 두 타입의 필드 구성이 같으면 `true`. */
export type Matches<Model, Spec> = MutuallyAssignable<DeepRequired<Model>, DeepRequired<Spec>>;

/** 모델이 읽는 필드가 전부 스펙에 있으면 `true`. 스펙에 필드가 늘어나는 건 통과한다. */
export type SubsetOf<Model, Spec> = [DeepRequired<Spec>] extends [DeepRequired<Model>]
	? true
	: false;

/** 불일치하면 `false`를 `true`에 할당할 수 없어 타입 에러가 난다. */
export type Expect<T extends true> = T;
