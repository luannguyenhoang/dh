import { GET_PAGE_ABOUT } from "@/app/api/GraphQl/about";
import { generateMetadataFromFullHead } from "@/ultil/seoUtils";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Metadata } from "next";
import { ReactNode } from "react";

const getAboutData = async () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query: GET_PAGE_ABOUT,
      fetchPolicy: "network-only",
    });

    return {
      seo: response?.data?.allGiIThiU?.nodes?.[0]?.seo || {},
    };
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {
      seo: {},
    };
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getAboutData();

  return {
    ...generateMetadataFromFullHead(seo.fullHead, seo.focusKeywords),
    robots: "index, follow",
  };
}

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
