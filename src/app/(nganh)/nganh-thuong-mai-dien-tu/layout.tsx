import { GET_THUONG_MAI_DIEN_TU_VA_MARKETING_SO } from "@/app/api/GraphQl/thuongMaiDienTuVaMarketingSo";
import { getSeoData } from "@/ultil/getSeoData";
import { generateMetadataFromFullHead } from "@/ultil/seoUtils";
import { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(
    GET_THUONG_MAI_DIEN_TU_VA_MARKETING_SO,
    "allThNgMIINT"
  );

  return {
    ...generateMetadataFromFullHead(
      seo.fullHead || "",
      seo.focusKeywords || ""
    ),
    robots: "index, follow",
  };
}

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
