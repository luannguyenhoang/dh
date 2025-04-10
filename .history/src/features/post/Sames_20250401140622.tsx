"use client";

import { CardBlog } from "@/components/CardBlog";
import { Loading } from "@/components/Loading";
import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import xss from "xss";

export const SamePosts = ({
  categories,
  currentSlug,
}: {
  categories: string[];
  currentSlug: string;
}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!categories.length || !currentSlug) {
      setIsLoading(false);
      return;
    }

    const getPosts = async () => {
      setIsLoading(true);
      try {
        const categoryQuery = categories
          .map((cat) => `categories=${encodeURIComponent(cat)}`)
          .join("&");

        const res = await fetch(
          `/api/same-posts?size=3&${categoryQuery}&exclude=${currentSlug}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: { posts: any[] } = await res.json();
        if (isMounted) setPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        if (isMounted) setError("Không thể tải bài viết.");
      }
      if (isMounted) setIsLoading(false);
    };

    getPosts();

    return () => {
      isMounted = false;
    };
  }, [categories, currentSlug]);

  return (
    <>
      <Divider pt="32px" />
      <Box pt="20px">
        <HStack justifyContent="space-between" pb="16px">
          <Heading as="h3" size="md">
            Có thể bạn quan tâm
          </Heading>
          <Button as={Link} href="/tin-tuc" variant="link" colorScheme="red">
            Xem tất cả
          </Button>
        </HStack>

        {!isLoading && (
          <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} gap="20px">
            {posts.map((post: any, index: number) => {
              const category = post.categories?.[0] || "";
              const tag = category === "tuyen-dung" ? "Tuyển dụng" : "Tin tức";

              return (
                <GridItem key={index}>
                  <CardBlog
                    title={xss(post?.title)}
                    desc={xss(post?.excerpt)}
                    image={post?.featured_image || ""}
                    path={`/${post?.slug}`}
                    tag={tag}
                  />
                </GridItem>
              );
            })}
          </SimpleGrid>
        )}
        {isLoading && <Loading />}
        {!isLoading && posts?.length === 0 && (
          <Grid placeItems={"center"} height={"40vh"}>
            Dữ liệu đang được chúng tôi cập nhập
          </Grid>
        )}
      </Box>
    </>
  );
};
