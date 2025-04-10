import { GET_LUAT_KING_TE } from "@/app/api/GraphQl/luatKingTe";
import { generateMetadataFromFullHead } from "@/ultil/seoUtils";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Metadata } from "next";
import { ReactNode } from "react";

const getCnttData = async () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query: GET_LUAT_KING_TE,
      fetchPolicy: "network-only",
    });

    return {
      seo: response?.data?.allCNgNghThNgTin?.nodes?.[0]?.seo || {},
    };
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {
      seo: {},
    };
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getCnttData();

 
  return {
    ...generateMetadataFromFullHead(seo.fullHead, seo.focusKeywords),
    robots: "index, follow",
  };
}
const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
