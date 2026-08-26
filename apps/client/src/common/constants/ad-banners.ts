import type { AdBanner } from "../_types/ad-banner";

/**
 * @description 메인 광고 배너 목록. 광고 관리 API가 생기면 이 상수를 서버 조회 결과로 교체하고
 * `AdBannerSection`에 그대로 넘기면 된다.
 */
export const AD_BANNERS: AdBanner[] = [
	{
		id: 1,
		href: "/toollist",
		title: "대학 생활에 필요한 툴, 다루다에서 한 번에",
		description: "카테고리별로 정리된 툴 정보를 확인해보세요",
	},
	{
		id: 2,
		href: "/community",
		title: "궁금한 툴이 있나요?",
		description: "다루다 커뮤니티에서 다른 학생들과 정보를 나눠보세요",
	},
];
