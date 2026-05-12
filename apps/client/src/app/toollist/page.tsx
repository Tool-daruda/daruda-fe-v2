import { FilterBar } from "./_components/filter-bar";
import { SearchBar } from "./_components/search-bar";
import { Sidebar } from "./_components/sidebar";
import * as s from "./_components/toollist.css";

const MOCK_DATA = Array.from({ length: 9 }).map((_, i) => ({
	id: `tool-item-${i}`,
}));

export default function ToolListPage() {
	return (
		<>
			<SearchBar />
			<div className={s.container}>
				<FilterBar />
				<div className={s.mainLayout}>
					<Sidebar />
					<section className={s.content}>
						<div className={s.grid}>
							{MOCK_DATA.map((item) => (
								<div
									key={item.id}
									style={{
										border: "1px solid #eee",
										height: "200px",
										borderRadius: "12px",
										backgroundColor: "#fff",
									}}
								>
									ToolCard Area
								</div>
							))}
						</div>
					</section>
				</div>
			</div>
		</>
	);
}
