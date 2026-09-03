import { getScrappedToolIds } from "@/common/api/scrap-tools";
import { UserApi } from "@/common/api/user-api";
import ToolCard from "@/common/components/tool-card/tool-card";
import { LICENSE_MAP } from "@/common/constants/price";
import { ScrappedToolsProvider } from "@/common/context/scrap-context";
import * as styles from "./favoriteTools.css";

export default async function FavoriteToolsPage() {
	const favoriteData = await UserApi.getFavoriteTools();
	const tools = favoriteData?.toolList || [];

	if (tools.length === 0) {
		return <div>찜한 툴이 없습니다.</div>;
	}

	return (
		// 위 조회와 같은 요청 안에서 캐싱되므로 호출이 늘지 않습니다.
		<ScrappedToolsProvider idsPromise={getScrappedToolIds()}>
			<div className={styles.gridContainer}>
				{tools.map((tool) => (
					<ToolCard
						key={tool.toolId}
						toolId={tool.toolId}
						title={tool.toolName}
						description={tool.description}
						thumbnailUrl={tool.toolLogo}
						tags={tool.keywords}
						priceType={LICENSE_MAP[tool.license]}
						badgeType={undefined}
						variant="horizontal"
					/>
				))}
			</div>
		</ScrappedToolsProvider>
	);
}
