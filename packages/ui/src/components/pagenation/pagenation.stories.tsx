import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import PageNation from ".";

const meta: Meta<typeof PageNation> = {
	title: "Components/PageNation",
	component: PageNation,
	tags: ["autodocs"],
	argTypes: {
		page: { control: "number" },
		totalPages: { control: "number" },
		onPageChange: { action: "page changed" },
	},
};

export default meta;
type Story = StoryObj<typeof PageNation>;

export const Default: Story = {
	args: {
		page: 1,
		totalPages: 10,
	},
	render: (args) => {
		const [page, setPage] = useState(args.page);

		return (
			<div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
				<PageNation
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
