import { GET_THUONG_MAI_DIEN_TU_VA_MARKETING_SO } from "@/app/api/GraphQl/thuongMaiDienTuVaMarketingSo";
import { generateMetadataFromFullHead } from "@/ultil/seoUtils";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Metadata } from "next";
import { ReactNode } from "react";

const getTmdtData = async () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query: GET_THUONG_MAI_DIEN_TU_VA_MARKETING_SO,
      fetchPolicy: "network-only",
    });

    return {
      seo: response?.data?.allThNgMIINT?.nodes?.[0]?.seo || {},
    };
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {
      seo: {},
    };
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getTmdtData();

  return {
    ...generateMetadataFromFullHead(seo.fullHead, seo.focusKeywords),
    robots: "index, follow",
  };
}
const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
