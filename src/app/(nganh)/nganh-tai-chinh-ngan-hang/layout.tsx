import { GET_TAI_CHINH_NGAN_HANG } from "@/app/api/GraphQl/taiChinhNganHang";
import { getSeoData } from "@/ultil/getSeoData";
import { generateMetadataFromFullHead } from "@/ultil/seoUtils";
import { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_TAI_CHINH_NGAN_HANG, "allTIChNhNgNHNg");

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
