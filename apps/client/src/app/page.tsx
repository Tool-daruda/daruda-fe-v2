import Client from "./client";
import { title } from "./page-style.css";

export default function Home() {
	return (
		<h1 className={title}>
			daruda
			<Client />
		</h1>
	);
}
