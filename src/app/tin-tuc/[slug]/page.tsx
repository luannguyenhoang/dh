
import { GET_POST_BY_SLUG } from "@/app/api/GraphQl/posts";
import { getClient } from "@/lib/ApolloClient";
import { replaceSeoRM } from "@/ultil/seoRankMath";
import {
  extractMetaContent,
  generateMetadataFromFullHead,
} from "@/ultil/seoUtils";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ErrorBoundary = dynamic(() => import("@/components/ErrorBoundary"));
const Post = dynamic(() => import("@/features/post").then((mod) => mod.Post));
const LayoutPost = dynamic(() =>
  import("@/layouts/layoutPost").then((mod) => mod.LayoutPost)
);
const Loading = dynamic(() =>
  import("@/components/Loading").then((mod) => mod.Loading)
);

async function getPost(slug: string) {
  try {
    const { data, errors } = await getClient().query({
      query: GET_POST_BY_SLUG,
      variables: { id: slug },
    });

    if (errors || !data?.post) {
      return null;
    }
    return {
      title: data.post.title,
      slug: data.post.slug,
      date: data.post.date,
      content: data.post.content,
      featuredImage: data.post.featuredImage?.node?.mediaItemUrl || "",
      categories:
        data.post.categories?.nodes?.map((node: any) => node.slug) || [],

      seo: {
        fullHead: data.post.seo?.fullHead || "",
        title: data.post.seo?.title || "",
        focusKeywords: data.post.seo?.focusKeywords || "",
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Bài viết không tồn tại" };

  return {
    ...generateMetadataFromFullHead(post.seo.fullHead, post.seo.focusKeywords),
  };
}
export const revalidate = 60;
export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  const processedFullHead = replaceSeoRM(post?.seo.fullHead);

  const jsonLdContent = extractMetaContent(
    processedFullHead,
    "application/ld+json"
  );
  return (
    <LayoutPost>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdContent,
        }}
      />
      <ErrorBoundary fallback={<h1>Lỗi phía máy chủ</h1>}>
        <Suspense fallback={<Loading />}>
          <Post post={post} />
        </Suspense>
      </ErrorBoundary>
    </LayoutPost>
  );
}
