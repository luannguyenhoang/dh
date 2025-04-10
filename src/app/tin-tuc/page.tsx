"server only";

import { fetchData } from "@/lib/Fetchdata";
import { replaceSeoRM } from "@/ultil/seoRankMath";
import {
  extractMetaContent,
  generateMetadataFromFullHead,
} from "@/ultil/seoUtils";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { GET_PAGE_NEWS } from "../api/GraphQl/news";

const Posts = dynamic(() =>
  import("@/features/posts").then((mod) => mod.Posts)
);
const ErrorBoundary = dynamic(() => import("@/components/ErrorBoundary"));
const Loading = dynamic(() =>
  import("@/components/Loading").then((mod) => mod.Loading)
);

export const revalidate = 60;
export async function generateMetadata(): Promise<Metadata> {
  const post = await fetchData(GET_PAGE_NEWS, "allTinTC");

  if (!post || !post.seo.fullHead) {
    return {
      title: "Tin tức mới nhất ",
      description: "Cập nhật tin tức mới nhất nhanh chóng và chính xác.",
      robots: "index, follow",
    };
  }

  return {
    ...generateMetadataFromFullHead(post.seo.fullHead, post.seo.focusKeywords),
    robots: "index, follow",
  };
}
export default async function Page() {
  const data = await fetchData(GET_PAGE_NEWS, "allTinTC");

  const processedFullHead = replaceSeoRM(data?.seo.fullHead);
  console.log("abc" + data?.seo?.title);

  const jsonLdContent = extractMetaContent(
    processedFullHead,
    "application/ld+json"
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdContent,
        }}
      />

      <ErrorBoundary fallback={<h1>Lỗi server</h1>}>
        <Suspense fallback={<Loading />}>
          <Posts title={data?.seo?.title || "Tin tức Đại học Thái Nguyên "} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
