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
import { GET_LICH_KHAI_GIANG } from "../api/GraphQl/lichKhaiGiang";

const LichKg = dynamic(() =>
  import("@/features/lich-khai-giang").then((mod) => mod.LichKg)
);
const ErrorBoundary = dynamic(() => import("@/components/ErrorBoundary"));
const Loading = dynamic(() =>
  import("@/components/Loading").then((mod) => mod.Loading)
);

export const revalidate = 60;
export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchData(GET_LICH_KHAI_GIANG, "allLChKhaiGiNg");

  if (!data || !data.seo?.fullHead) {
    return {
      title: "Lịch",
      description: "Cập nhật lịch khai giảng dự kiến",
      robots: "index, follow",
    };
  }

  return {
    ...generateMetadataFromFullHead(data.seo.fullHead, data.seo.focusKeywords),
    robots: "index, follow",
  };
}

export default async function Page() {
  const data = await fetchData(GET_LICH_KHAI_GIANG, "allLChKhaiGiNg");

  const processedFullHead = data?.seo?.fullHead
    ? replaceSeoRM(data.seo.fullHead)
    : "";

  const jsonLdContent = extractMetaContent(
    processedFullHead,
    "application/ld+json"
  );

  return (
    <>
      {jsonLdContent && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdContent,
          }}
        />
      )}

      <ErrorBoundary fallback={<h1>Lỗi server</h1>}>
        <Suspense fallback={<Loading />}>
          <LichKg serverData={data} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
