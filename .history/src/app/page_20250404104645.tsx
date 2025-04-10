export const revalidate = 5;
import { replaceSeoRM } from "@/ultil/seoRankMath";
import {
  extractMetaContent,
  generateMetadataFromFullHead,
} from "@/ultil/seoUtils";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { GET_PAGE_HOME } from "./api/GraphQl/home";
import { GET_TIME_LINE } from "./api/GraphQl/lichKhaiGiang";
import { GET_POSTS_BY_CATEGORY } from "./api/GraphQl/posts";

const Home = dynamic(() => import("@/features/home").then((mod) => mod.Home));

const getHomeData = async () => {
  const client = new ApolloClient({
    uri: process.env.API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const newsCategorySlug = "tin-tuc";
    const notifiCategorySlug = "thong-bao";

    const [homeResponse, timelineResponse, newsResponse, notifiResponse] =
      await Promise.all([
        client.query({
          query: GET_PAGE_HOME,
          fetchPolicy: "network-only",
        }),
        client.query({
          query: GET_TIME_LINE,
          fetchPolicy: "network-only",
        }),
        client.query({
          query: GET_POSTS_BY_CATEGORY,
          variables: {
            slug: newsCategorySlug,
            size: 4,
            offset: 0,
          },
          fetchPolicy: "network-only",
        }),
        client.query({
          query: GET_POSTS_BY_CATEGORY,
          variables: {
            slug: notifiCategorySlug,
            size: 4,
            offset: 0,
          },
          fetchPolicy: "network-only",
        }),
      ]);

    let timelineData = [];
    const labelText =
      timelineResponse?.data?.allLChKhaiGiNg?.nodes?.[0]?.lChKhaiGiNg?.section1
        ?.label;

    if (labelText) {
      timelineData = labelText
        .split(/\r?\n/)
        .filter((line: string) => line.trim() !== "");
    }

    const news = newsResponse?.data?.posts?.nodes || [];

    const notifis = notifiResponse?.data?.posts?.nodes || [];

    return {
      homeData: homeResponse?.data?.allTrangCh?.nodes?.[0]?.trangCh || {},
      seo: homeResponse?.data?.allTrangCh?.nodes?.[0]?.seo || {},
      timelineData,
      news,
      notifis,
    };
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {
      homeData: {},
      seo: {},
      timelineData: [],
      news: [],
      notifis: [],
    };
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHomeData();

  if (!seo?.fullHead) {
    return {
      title: "Trang chủ",
      description: "Trang chủ website",
      robots: "index, follow",
    };
  }

  return {
    ...generateMetadataFromFullHead(seo.fullHead, seo.focusKeywords),
    robots: "index, follow",
  };
}

const HomePage = async () => {
  const { homeData, seo, timelineData, news, notifis } = await getHomeData();
  const processedFullHead = replaceSeoRM(seo?.fullHead);
  const jsonLdContent = extractMetaContent(
    processedFullHead,
    "application/ld+json"
  );

  return (
    <main>
      {jsonLdContent && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdContent,
          }}
        />
      )}
      <Home
        homeData={homeData}
        timelineData={timelineData}
        news={news}
        notifis={notifis}
      />
    </main>
  );
};

export default HomePage;
