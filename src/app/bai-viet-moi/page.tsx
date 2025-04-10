"server only";

import { LatestPost } from "@/features/latestPost";

const api_url = process.env.API_URL || "";

const getLatestPosts = async () => {
  try {
    const res = await fetch(
      `${api_url}/posts?_embed&per_page=9&orderby=date&order=desc`,
      {
        next: {
          revalidate: 10,
        },
      }
    );
    const posts: any[] = await res.json();

    const postsWithFeaturedImages = posts?.map((post: any) => {
      const featured_image =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

      return {
        ...post,
        featured_image,
      };
    });

    return { posts: postsWithFeaturedImages };
  } catch (error) {
    console.log(error);
    return { posts: [] };
  }
};

const Page = async () => {
  const { posts } = await getLatestPosts();

  return (
    <>
      <LatestPost posts={posts} />
    </>
  );
};

export default Page;
