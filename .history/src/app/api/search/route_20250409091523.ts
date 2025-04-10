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

    // Tìm kiếm tương đối - tách từ khóa tìm kiếm thành mảng các từ
    const searchTerms = search.toLowerCase().split(/[\s,.-]+/).filter(term => term.length > 1);
    
    // Lọc kết quả dựa trên từng từ khóa tìm kiếm (tìm kiếm tương đối)
    const filteredPosts = data.posts.nodes.filter((post: any) => {
      const title = (post.title?.toLowerCase() || "");
      const excerpt = (post.excerpt?.toLowerCase() || "");
      
      // Nếu không có từ khóa tìm kiếm hợp lệ, trả về tất cả
      if (searchTerms.length === 0) return true;
      
      // Kiểm tra xem có bất kỳ từ khóa nào trùng khớp với tiêu đề hoặc nội dung không
      return searchTerms.some(term => 
        title.includes(term) || excerpt.includes(term)
      );
    });

    const debugInfo = {
      searchQuery: search,
      searchTerms: searchTerms,
      type,
      page,
      totalBeforeFilter: data.posts.nodes.length,
      totalAfterFilter: filteredPosts.length,
      filterCriteria: "Tiêu đề hoặc mô tả chứa ít nhất một từ trong từ khóa tìm kiếm",
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({
      posts: filteredPosts,
      totalPosts: filteredPosts.length.toString(),
      debug: debugInfo
    });

  } catch (error) {
    console.error("GraphQL Error:", error);
    return NextResponse.json({ 
      posts: [], 
      totalPosts: "0",
      debug: {
        error: "Lỗi khi tìm kiếm",
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
} 