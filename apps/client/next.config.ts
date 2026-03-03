import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
	transpilePackages: ["@repo/ui"],
};

export default withVanillaExtract(nextConfig);
