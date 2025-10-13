import { TextField } from "@repo/ui";
import { themeClass, themeVars } from "@repo/ui/foundations";
import { useState } from "react";

function App() {
	const [value, setValue] = useState("");
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleClear = () => {
		setValue("");
	};

	return (
		<div className={themeClass}>
			<TextField
				type="text"
				placeholder="내용을 입력하세요"
				size="xl"
				value={value}
				onChange={handleChange}
				onClear={handleClear}
				style={{ color: themeVars.colors.brand.iris[50] }}
			/>
		</div>
	);
}

export default App;
