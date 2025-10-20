import { Dropdown, InputImage, type Option, TextArea, TextField } from "@repo/ui";
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

	const dropdownOptions: Option[] = [
		{ label: "AI", value: "ai" },
		{ label: "문서 작성&편집", value: "document" },
		{ label: "프레젠테이션", value: "presentation" },
		{ label: "협업&커뮤니케이션", value: "communication" },
		{ label: "데이터", value: "data" },
		{ label: "그래픽&디자인", value: "design" },
	];

	const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

	const handleDropdownChange = (option: Option) => {
		setSelectedValue(option.value);
	};

	return (
		<div className={themeClass}>
			<Dropdown
				options={dropdownOptions}
				value={selectedValue}
				onChange={handleDropdownChange}
				maxHeight={3}
				placeholder="내용을 입력하세요"
			/>
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
