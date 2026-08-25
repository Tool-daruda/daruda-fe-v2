export type AdBanner = {
	id: number;
	href: string;
	title: string;
	description: string;
	/** 등록된 배너 이미지. 없으면 title/description만 표시한다 */
	imageUrl?: string;
};
