"server only";

import { Post } from "@/features/post";

const api_url = process.env.API_URL || "";
const getLatestPosts = async () => {
  try {
    const res = await fetch(
      `${api_url}/posts?posts?per_page=10&orderby=date&order=desc`,
      {
        next: { revalidate: 1 },
      }
    );
    if (!res.ok) {
      throw new Error(`Posts fetch failed with status: ${res.statusText}`);
    }
    const posts: any[] = await res.json();

    return { posts: posts || [] };
  } catch (error) {
    console.log(error);
    return { posts: [] };
  }
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const { posts } = await getLatestPosts();
  const post = posts?.find((post) => post.slug === params.slug);

  return (
    <div>
      <Post post={post} />
    </div>
  );
};

export default Page;
