import { InputImage, TextArea, TextField } from "@repo/ui";
import { themeClass } from "@repo/ui/foundations";
import { useState } from "react";

function App() {
	const [value, setValue] = useState("");
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleClear = () => {
		setValue("");
	};

	const [existingImages, setExistingImages] = useState<string[]>([
		// "https://via.placeholder.com/100x100.png?text=Image+1", // 예시 데이터
	]);

	const [newImages, setNewImages] = useState<File[]>([]);

	const handleImageChange = (files: File[]) => {
		setNewImages(files);
	};

	const handleDeleteExisting = (url: string) => {
		setExistingImages((prevImages) => prevImages.filter((imgUrl) => imgUrl !== url));
	};

	const handleDeleteNew = (fileToDelete: File) => {
		setNewImages((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
	};

	const handleValidationError = (error: { type: string; message: string }) => {
		alert(`[${error.type}] ${error.message}`);
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
			/>
			<TextArea value={value} onChange={handleChange} />
			<InputImage
				existingImages={existingImages}
				newImages={newImages}
				onImageChange={handleImageChange}
				onDeleteExisting={handleDeleteExisting}
				onDeleteNew={handleDeleteNew}
				onValidationError={handleValidationError}
			/>
		</div>
	);
}

export default App;
