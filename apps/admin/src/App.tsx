import { themeClass } from "@repo/ui/foundations";
import * as styles from "./App.css";

function App() {
	return (
		<div className={themeClass}>
			<div className={styles.container}>
				<p className={styles.title}>디자인 시스템 테스트</p>
				<p className={styles.description}>zz.</p>
			</div>
		</div>
	);
}

export default App;
