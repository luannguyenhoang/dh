"server only";

import { Post } from "@/features/post";

const api_url = process.env.API_URL || "";
const getPost = async ({ slug }: { slug: string }) => {
  try {
    const res = await fetch(`${api_url}/posts?status=draft&slug=${slug}`, {
      next: { revalidate: 10 },
    });
    const posts = await res.json();

    return posts[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getSamePosts = async (post: any) => {
  const categoryId = post?.categories[0]; // Giả sử mỗi bài viết chỉ thuộc về một thể loại

  if (categoryId) {
    // Lấy danh sách các bài viết cùng thể loại
    const resRelatedPosts = await fetch(
      `${api_url}/posts?categories=${categoryId}&exclude=${post?.id}&per_page=3&_embed`,
      {
        next: { revalidate: 10 },
      }
    );

    const relatedPosts: any[] = await resRelatedPosts.json();
    const postsWithFeaturedImages = relatedPosts?.map((relatedPost: any) => {
      const featured_image =
        relatedPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

      return {
        ...relatedPost,
        featured_image,
      };
    });

    return postsWithFeaturedImages || [];
  }

  return [];
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost({ slug: params.slug });
  const relatedPosts = await getSamePosts(post);

  return (
    <div>
      <Post post={post} />
    </div>
  );
};
export default Page;
