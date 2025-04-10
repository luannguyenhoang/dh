import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextResponse } from "next/server";
import { SEARCH_POSTS } from "../GraphQl/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "news";
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 8;
  const fetchSize = 1000;
  const offset = 0;

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  try {
    const { data } = await client.query({
      query: SEARCH_POSTS,
      variables: { size: fetchSize, offset },
      fetchPolicy: "network-only",
    });

    if (!data) {
      throw new Error("Không thể lấy dữ liệu");
    }

    const normalizedSearch = search
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const exactMatches = data.posts.nodes.filter((post: any) => {
      const title = (post.title?.toLowerCase() || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return title === normalizedSearch;
    });

    if (exactMatches.length > 0) {
      const startIndex = (page - 1) * pageSize;
      const paginatedPosts = exactMatches.slice(startIndex, startIndex + pageSize);
      return NextResponse.json({
        posts: paginatedPosts,
        totalPosts: exactMatches.length.toString(),
      });
    }

    const searchTerms = normalizedSearch
      .split(/[\s,.-]+/)
      .filter((term) => term.length > 1);

    const filteredPosts = data.posts.nodes.filter((post: any) => {
      const title = (post.title?.toLowerCase() || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const excerpt = (post.excerpt?.toLowerCase() || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      if (searchTerms.length === 0) return true;

      return searchTerms.some(
        (term) => title.includes(term) || excerpt.includes(term)
      );
    });

    const sortedPosts = filteredPosts.sort((a: any, b: any) => {
      const titleA = (a.title?.toLowerCase() || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const titleB = (b.title?.toLowerCase() || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      const matchCountA = searchTerms.filter((term) => titleA.includes(term)).length;
      const matchCountB = searchTerms.filter((term) => titleB.includes(term)).length;

      return matchCountB - matchCountA;
    });

    const startIndex = (page - 1) * pageSize;
    const paginatedPosts = sortedPosts.slice(startIndex, startIndex + pageSize);

    return NextResponse.json({
      posts: paginatedPosts,
      totalPosts: sortedPosts.length.toString(),
    });
  } catch (error) {
    console.error("GraphQL Error:", error);
    return NextResponse.json(
      {
        posts: [],
        totalPosts: "0",
      },
      { status: 500 }
    );
  }
}
