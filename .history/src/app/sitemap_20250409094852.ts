import { getClient } from "@/lib/ApolloClient";
import { TMenus, menus } from "@/router";
import type { MetadataRoute } from "next";
import { GET_SITEMAP } from "./api/GraphQl/posts";

const API_URL = process.env.NEXT_PUBLIC_DOMAIN || "https://yourdomain.com";

// Lấy đường dẫn tĩnh
const getAllPaths = (menus: TMenus): MetadataRoute.Sitemap => {
  const paths: MetadataRoute.Sitemap = [];

  const collectPaths = (menuList: TMenus) => {
    for (const menu of menuList) {
      if (menu.path && menu.path !== "#") {
        paths.push({ url: `${API_URL}${menu.path}` });
      }

      if ("childs" in menu && Array.isArray(menu.childs)) {
        collectPaths(menu.childs as TMenus);
      }
    }
  };

  collectPaths(menus);
  return paths;
};

// Lấy bài viết từ GraphQL
async function getPostPaths(): Promise<MetadataRoute.Sitemap> {
  try {
    const { data } = await getClient().query({
      query: GET_SITEMAP,
    });

    const posts = data?.posts?.nodes;
    if (!posts || !Array.isArray(posts)) return [];

    return posts.map((post: { slug: string }) => ({
      url: `${API_URL}/${post.slug}`,
    }));
  } catch (error) {
    console.error("Failed to fetch posts for sitemap", error);
    return [];
  }
}
export const revalidate = 60;
// Sitemap chính
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = getAllPaths(menus);
  const postPaths = await getPostPaths();
  return [...staticPaths, ...postPaths];
}
