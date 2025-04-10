"use client";

import { Box, Grid, Heading, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import xss from "xss";

const CardBlogVert = dynamic(() =>
  import("@/components/CardBlogVert").then((mod) => mod.CardBlogVert)
);
const Loading = dynamic(() =>
  import("@/components/Loading").then((mod) => mod.Loading)
);

export const StyledPaginate = styled(ReactPaginate)`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }

  li {
    margin: 5px 2px;
  }

  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
    display: inline-block;
    min-width: 32px;
    text-align: center;

    @media (max-width: 480px) {
      padding: 0.1rem 0.6rem;
      min-width: 28px;
    }
  }

  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }

  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
  }

  li.disabled a {
    color: grey;
  }

  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

export const ListPosts = ({
  handleRouter,
}: {
  handleRouter?: ({ selected }: { selected: number }) => void;
}) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const first = 8;

  const [posts, setPosts] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState("0");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(
          `/api/posts?&size=${first}&offset=${(page - 1) * first}`,
          {
            next: { revalidate: 1 },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
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
    <Box>
      {!isLoading && (
        <VStack spacing={"16px"} align="stretch">
          {posts?.map((post: any, index: number) => {
            const category = post?.categories[0];
            const tag = category === "tuyen-dung" ? "Tuyển dụng" : "Tin tức";
            
            return (
              <CardBlogVert
                key={index}
                title={xss(post?.title)}
                desc={xss(post?.excerpt)}
                image={post?.featured_image || ""}
                path={`/tin-tuc/${post?.slug}`}
                tag={tag}
              />
            );
          })}
          
          {posts?.length > 0 && (
            <Box pt={"32px"} display="flex" justifyContent="center">
              <StyledPaginate
                className="paginate"
                previousLabel="<"
                nextLabel=">"
                pageCount={Math.ceil(Number(totalPosts) / first)}
                onPageChange={handleRouter}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                activeClassName="active"
                forcePage={Number(page) - 1}
              />
            </Box>
          )}
          
          {posts?.length === 0 && (
            <Grid placeItems={"center"} height={"40vh"}>
              Dữ liệu đang được chúng tôi cập nhập
            </Grid>
          )}
        </VStack>
      )}

      {isLoading && <Loading />}
    </Box>
  );
};
