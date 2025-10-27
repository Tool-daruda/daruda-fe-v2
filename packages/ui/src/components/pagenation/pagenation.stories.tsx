import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import Pagination from ".";

const meta: Meta<typeof Pagination> = {
	title: "Components/Pagination",
	component: Pagination,
	tags: ["autodocs"],
	argTypes: {
		page: { control: "number" },
		totalPages: { control: "number" },
		onPageChange: { action: "page changed" },
	},
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
	args: {
		page: 1,
		totalPages: 10,
	},
	render: (args) => {
		const [page, setPage] = useState(args.page);

		useEffect(() => {
			setPage(args.page);
		}, [args.page]);

		return (
			<div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
				<Pagination
					{...args}
					page={page}
					onPageChange={(newPage) => {
						setPage(newPage);
						args.onPageChange?.(newPage);
					}}
				/>
			</div>
		);
	},
};
