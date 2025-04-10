import { getClient } from "@/lib/ApolloClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const size = parseInt(searchParams.get("size") || "3", 10);
  const categories = searchParams.getAll("categories");
  const exclude = searchParams.get("exclude"); // <-- lấy slug cần loại

  if (!categories.length) {
    return NextResponse.json({ error: "Missing categories" }, { status: 400 });
  }

  try {
    const category = categories[0]; // chỉ dùng 1 category slug
    const variables = { category, size };

    const { data } = await getClient().query({
      query: GET_SAME_POSTS,
      variables,
    });

    if (!data?.posts?.nodes.length) {
      return NextResponse.json({ error: "No posts found" }, { status: 404 });
    }

    const filteredPosts = data.posts.nodes.filter(
      (node: any) => node.slug !== exclude
    );

    if (!filteredPosts.length) {
      return NextResponse.json({ error: "No posts found" }, { status: 404 });
    }

    const posts = filteredPosts.map((node: any) => ({
      title: node.title,
      slug: node.slug,
      date: node.date,
      excerpt: node.excerpt,
      featured_image: node.featuredImage?.node?.mediaItemUrl || "",
      categories: node.categories.nodes.map((cat: any) => cat.slug),
    }));

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
