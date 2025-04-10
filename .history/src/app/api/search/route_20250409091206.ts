import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_POSTS } from "../GraphQl/search";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "news";
  const page = Number(searchParams.get("page")) || 1;
  const size = 8;
  const offset = (page - 1) * size;

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  try {
    const { data } = await client.query({
      query: GET_POSTS,
      variables: { size, offset },
      fetchPolicy: "network-only",
    });

    if (!data) {
      throw new Error("Không thể lấy dữ liệu");
    }

    const filteredPosts = data.posts.nodes.filter((post: any) => {
      const title = post.title.toLowerCase();
      const excerpt = post.excerpt?.toLowerCase() || "";
      const searchTerm = search.toLowerCase();
      
      return title.includes(searchTerm) || excerpt.includes(searchTerm);
    });

    return NextResponse.json({
      posts: filteredPosts,
      totalPosts: filteredPosts.length.toString(),
    });

  } catch (error) {
    console.error("GraphQL Error:", error);
    return NextResponse.json({ posts: [], totalPosts: "0" }, { status: 500 });
  }
} 