"use client";

import { CardBlog } from "@/components/CardBlog";
import { Loading } from "@/components/Loading";
import { formatDate } from "@/ultil/date";
import { Container, Grid } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSize } from "../../hooks/useSizeWindow";
import xss from "xss";

export const StyledContainer = styled(Container)`
  .mySwiper {
    padding-bottom: 38px;
  }

  .swiper-slide {
    height: 550px;
  }
`;

export const SLiderPosts = () => {
  const { size } = useSize();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const first = 9; // Số lượng bài viết hiển thị trong slider

  const [posts, setPosts] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState("0");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/posts?size=${first}&offset=${(page - 1) * first}`,
          {
            next: { revalidate: 3 },
          }
        );
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data: { posts: any[]; totalPosts: string } = await res.json();
        const { posts, totalPosts } = data;
        if (posts?.length) {
          setPosts(posts);
          setTotalPosts(totalPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setIsLoading(false);
    };

    getPosts();
  }, [page]);

  return (
    <StyledContainer maxW="6xl">
      {!isLoading && (
        <Swiper
          slidesPerView={
            (size.width < 480 && 1) || (size.width < 992 && 2) || 3
          }
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {posts?.map((post: any, index: number) => {
            const category = post?.categories?.[0];
            const tag = category === "tuyen-dung" ? "Tuyển dụng" : "Tin hot";

            return (
              <SwiperSlide key={index}>
                <CardBlog
                  date={post?.date ? formatDate(post.date) : ""}
                  key={index}
                  title={xss(post?.title?.rendered || post?.title)}
                  tag={tag}
                  desc={xss(post?.excerpt?.rendered || post?.excerpt)}
                  image={post?.featured_image || ""}
                  path={`/tin-tuc/${post?.slug}`}
                />
              </SwiperSlide>
            );
          })}
          {posts?.length === 0 && (
            <Grid placeItems={"center"} height={"40vh"}>
              Dữ liệu đang được chúng tôi cập nhập
            </Grid>
          )}
        </Swiper>
      )}

      {isLoading && <Loading />}
    </StyledContainer>
  );
};
