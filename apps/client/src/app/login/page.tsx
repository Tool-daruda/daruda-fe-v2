import { LoginButton } from "./_components/login-button";
import * as styles from "./login.css";

const ERROR_MESSAGES: Record<string, string> = {
	no_code: "카카오 인증 코드를 받지 못했어요. 다시 시도해 주세요.",
	auth_failed: "카카오 로그인에 실패했어요. 다시 시도해 주세요.",
	server_error: "서버 오류가 발생했어요. 잠시 후 다시 시도해 주세요.",
	config: "서비스 설정에 문제가 있어요. 관리자에게 문의해 주세요.",
};

interface Props {
	searchParams: Promise<{ next?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
	const { next, error } = await searchParams;

	return (
		<main className={styles.page}>
			<div className={styles.card}>
				<div className={styles.logoArea}>
					<h1 className={styles.logoTitle}>daruda</h1>
					<p className={styles.logoSubtitle}>대학생활에 필요한 AI 툴을 한눈에</p>
				</div>

				<LoginButton next={next} />

				{error && ERROR_MESSAGES[error] && (
					<p className={styles.errorMessage}>{ERROR_MESSAGES[error]}</p>
				)}
			</div>
		</main>
	);
}
