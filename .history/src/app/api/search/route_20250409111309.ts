import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextResponse } from "next/server";
import { SEARCH_POSTS } from "../GraphQl/search";

const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-:]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const paginateResults = (items: any[], page: number, pageSize: number) => {
  const startIndex = (page - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 12;

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  try {
    const { data } = await client.query({
      query: SEARCH_POSTS,
      variables: { size: 10000, offset: 0 },
      fetchPolicy: "network-only",
    });

    if (!data?.posts?.nodes) {
      throw new Error("Không thể lấy dữ liệu");
    }

    const normalizedSearch = normalizeText(search);
    const posts = data.posts.nodes;

    const exactMatches = posts.filter(
      (post: any) => normalizeText(post.title || "") === normalizedSearch
    );

    if (exactMatches.length > 0) {
      const paginatedPosts = paginateResults(exactMatches, page, pageSize);
      return NextResponse.json({
        posts: paginatedPosts,
        totalPosts: exactMatches.length.toString(),
      });
    }

    // Tìm kiếm theo từ khóa
    const searchTerms = normalizedSearch
      .split(/[\s,.-]+/)
      .filter((term) => term.length > 1);

    if (searchTerms.length === 0) {
      return NextResponse.json({
        posts: paginateResults(posts, page, pageSize),
        totalPosts: posts.length.toString(),
      });
    }

    const getMatchCount = (text: string) =>
      searchTerms.filter((term) => text.includes(term)).length;

    const filteredAndSortedPosts = posts
      .filter((post: any) => {
        const title = normalizeText(post.title || "");
        const excerpt = normalizeText(post.excerpt || "");
        return searchTerms.some(
          (term) => title.includes(term) || excerpt.includes(term)
        );
      })
      .sort((a: any, b: any) => {
        const titleA = normalizeText(a.title || "");
        const titleB = normalizeText(b.title || "");
        return getMatchCount(titleB) - getMatchCount(titleA);
      });

    const paginatedPosts = paginateResults(
      filteredAndSortedPosts,
      page,
      pageSize
    );

    return NextResponse.json({
      posts: paginatedPosts,
      totalPosts: filteredAndSortedPosts.length.toString(),
    });
  } catch (error) {
    console.error("GraphQL Error:", error);
    return NextResponse.json({ posts: [], totalPosts: "0" }, { status: 500 });
  }
}
