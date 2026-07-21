import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
	transpilePackages: ["@repo/ui"],

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "daruda.s3.ap-northeast-2.amazonaws.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "img.youtube.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*.objectstorage.ap-chuncheon-1.oci.customer-oci.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default withVanillaExtract(nextConfig);
