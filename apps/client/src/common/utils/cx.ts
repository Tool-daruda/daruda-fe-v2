type ClassValue = string | false | null | undefined;

/**
 * `@repo/ui`의 `cx`와 같은 역할이지만 의존성이 없다.
 * `@repo/ui`는 배럴(index.ts)에 클라이언트 컴포넌트가 섞여 있어서, `cx` 하나만 쓰려고
 * import해도 그 파일이 서버 컴포넌트로 못 남는다. 서버 컴포넌트에서 클래스를 조건부로
 * 합쳐야 할 때는 `@repo/ui`의 cx 대신 이걸 쓴다.
 */
export const cx = (...classes: ClassValue[]) => classes.filter(Boolean).join(" ");
