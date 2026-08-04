import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignupForm } from "./_components/signup-form";

export default async function SignupPage() {
	const cookieStore = await cookies();
	const raw = cookieStore.get("pendingSignup")?.value;

	if (!raw) redirect("/login");

	try {
		const parsed = JSON.parse(raw) as { email?: string };
		if (!parsed?.email) redirect("/login");
	} catch {
		redirect("/login");
	}

	return (
		<main
			style={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<SignupForm />
		</main>
	);
}
