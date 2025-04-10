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

    const searchTerms = search
      .toLowerCase()
      .split(/[\s,.-]+/)
      .filter((term) => term.length > 1);

    const filteredPosts = data.posts.nodes.filter((post: any) => {
      const title = post.title?.toLowerCase() || "";
      const excerpt = post.excerpt?.toLowerCase() || "";
      if (searchTerms.length === 0) return true;
      return searchTerms.some(
        (term) => title.includes(term) || excerpt.includes(term)
      );
    });
    const startIndex = (page - 1) * pageSize;
    const paginatedPosts = filteredPosts.slice(
      startIndex,
      startIndex + pageSize
    );
    const debugInfo = {
      searchQuery: search,
      searchTerms: searchTerms,
      type,
      page,
      totalBeforeFilter: data.posts.nodes.length,
      totalAfterFilter: filteredPosts.length,
      displayedResults: paginatedPosts.length,
      filterCriteria:
        "Tiêu đề hoặc mô tả chứa ít nhất một từ trong từ khóa tìm kiếm",
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({
      posts: paginatedPosts,
      totalPosts: filteredPosts.length.toString(),
      debug: debugInfo,
    });
  } catch (error) {
    console.error("GraphQL Error:", error);
    return NextResponse.json(
      {
        posts: [],
        totalPosts: "0",
        debug: {
          error: "Lỗi khi tìm kiếm",
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}
