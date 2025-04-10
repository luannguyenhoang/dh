import { getClient } from "@/lib/ApolloClient";
import { NextRequest, NextResponse } from "next/server";
import { GET_POSTS } from "../GraphQl/posts";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const size = searchParams.get("size");
  const offset = searchParams.get("offset");

  const pageSize = size ? parseInt(size) : 6;
  const offsetValue = offset ? parseInt(offset) : 0;

  try {
    const variables = { size: pageSize, offset: offsetValue };
    const { data } = await getClient().query({ query: GET_POSTS, variables });

    if (!data?.posts) {
      return NextResponse.json(
        { error: "No posts available" },
        { status: 404 }
      );
    }

    const posts =
      data.posts.nodes.map((node: any) => ({
        title: node.title,
        slug: node.slug,
        date: node.date,
        excerpt: node.excerpt,
        featured_image: node.featuredImage?.node?.mediaItemUrl || "",
        categories:
          node.categories?.nodes.map((category: any) => category.slug) || [],
      })) || [];

    const totalPosts = data.posts.pageInfo.offsetPagination.total.toString();
    const pageInfo = {
      hasMore: data.posts.pageInfo.offsetPagination.hasMore,
      hasPrevious: dat  a.posts.pageInfo.offsetPagination.hasPrevious,
      total: data.posts.pageInfo.offsetPagination.total,
    };

    return NextResponse.json({ posts, totalPosts, pageInfo }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
