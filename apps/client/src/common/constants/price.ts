export const LICENSE_MAP = {
	무료: "free",
	유료: "paid",
	"부분 유료": "partial",
} as const;

export const PRICE_LABEL: Record<PriceType, ApiLicenseType> = {
	free: "무료",
	paid: "유료",
	partial: "부분 유료",
};

export type ApiLicenseType = keyof typeof LICENSE_MAP;
export type PriceType = (typeof LICENSE_MAP)[ApiLicenseType];
