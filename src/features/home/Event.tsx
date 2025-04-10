"use client";

import { CardBlog } from "@/components/CardBlog";
import { HeadSection } from "@/components/HeadSection";
import {
  Button,
  Container,
  GridItem,
  HStack,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import Link from "next/link";

export const Event = ({
  news = [],
  notifis = [],
}: {
  news?: any[];
  notifis?: any[];
}) => {
  const formatPosts = (posts: any[], tag: string, bgTag: string) => {
    return posts.map((post) => ({
      image: post?.featuredImage?.node?.mediaItemUrl || "",
      title: post?.title || "",
      desc: post?.excerpt || "",
      path: `/tin-tuc/${post.slug}`,
      tag: tag,
      bgTag: bgTag,
      date: new Date(post?.date).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));
  };

  const formattedNews = formatPosts(news, "Tin tức", "red.500");
  const formattedNotifis = formatPosts(notifis, "Thông báo", "green.500");

  return (
    <Container maxW={"6xl"} py={"64px"}>
      <HeadSection
        title="Tin tức - Thông báo"
        subtitle="tin tức"
        desc="Đừng vội lướt qua những tin tức và thông báo cập nhật từ chúng tôi"
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} pt={"24px"} spacing={"8"}>
        <GridItem>
          <Heading
            as={"h3"}
            size={{ base: "sm", lg: "md" }}
            borderBottom={"1px solid"}
            borderColor={"gray.100"}
            textAlign={{ base: "center", lg: "left" }}
            color={"blue.800"}
          >
            Tin tức
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} gap={"24px"}>
            {formattedNews.map((post, index) => (
              <CardBlog
                key={index}
                image={post.image}
                tag={post.tag}
                bgTag={post.bgTag}
                title={post.title}
                desc={post.desc}
                path={post.path}
                date={post.date}
              />
            ))}
          </SimpleGrid>
        </GridItem>
        {formattedNotifis.length > 0 && (
          <GridItem>
            <Heading
              as={"h3"}
              size={{ base: "sm", lg: "md" }}
              textAlign={{ base: "center", lg: "right" }}
              borderBottom={"1px solid"}
              borderColor={"gray.100"}
              color={"blue.800"}
            >
              Thông báo
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} gap={"24px"}>
              {formattedNotifis.map((post, index) => (
                <CardBlog
                  key={index}
                  image={post.image}
                  tag={post.tag}
                  bgTag={post.bgTag}
                  title={post.title}
                  desc={post.desc}
                  path={post.path}
                  date={post.date}
                />
              ))}
            </SimpleGrid>
          </GridItem>
        )}
      </SimpleGrid>

      <HStack justify={"center"}>
        <Button
          as={Link}
          href={"/tin-tuc"}
          colorScheme={"#064121"}
          variant={"link"}
          fontSize={{ base: "md", md: "xl" }}
        >
          Xem tất cả
        </Button>
      </HStack>
    </Container>
  );
};
