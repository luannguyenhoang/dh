import { ReactNode } from "react";
import { Metadata } from "next";
import { GET_CONG_NGHE_THONG_TIN } from "@/app/api/GraphQl/congNgheThongTin";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { generateMetadataFromFullHead } from "@/ultil/seoUtils";

const getCnttData = async () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query: GET_CONG_NGHE_THONG_TIN,
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
  console.log(seo);

  if (!seo?.fullHead) {
    return {
      title: "Ngành công nghệ thông tin",
      description:
        "Tuyển sinh đại học từ xa ngành công nghệ thông tin - Đại học Thái nguyên, nhận bằng đại học tại nhà",
      robots: "index, follow",
    };
  }

  return {
    ...generateMetadataFromFullHead(seo.fullHead, seo.focusKeywords),
    robots: "index, follow",
  };
}

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
