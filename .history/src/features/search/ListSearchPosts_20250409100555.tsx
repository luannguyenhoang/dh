"use client";

import { Loading } from "@/components/Loading";
import { clean } from "@/lib/sanitizeHtml";
import { formatDate } from "@/ultil/date";
import { toSlug } from "@/ultil/toSlug";
import {
  Box,
  Center,
  GridItem,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import dynamic from "next/dynamic";

const CardBlog = dynamic(() =>
  import("@/components/CardBlog").then((mod) => mod.CardBlog)
);

const StyledPaginate = styled(ReactPaginate)`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0 1rem;

  li a {
    border-radius: 7px;
    padding: 0.1rem 0.5rem;
    border: gray 1px solid;
    cursor: pointer;
    margin-right: 3px;
    margin-left: 3px;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #003163;
    border-color: transparent;
    color: white;
    min-width: 24px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

export const ListSearchPosts = ({
  handleRouter,
}: {
  handleRouter?: ({
    selected,
    searchText,
  }: {
    selected: number;
    searchText: string;
  }) => void;
}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const [resetpagi, setResetpagi] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    setResetpagi(true);
  }, [page]);

  useEffect(() => {
    let keywords = keyword;
    var pages = Number(page);

    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/search/?type=news&page=${pages}&search=${keywords}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data: { posts: any[]; totalPosts: string } = await res.json();
        const { posts, totalPosts } = data;
        totalPosts && setTotalPosts(totalPosts);
        setPosts(posts);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
      setResetpagi(false);
    };
    getPosts();
  }, [keyword, page]);

  const len = Math.ceil(Number(totalPosts) / 8);

  return (
    <>
      <Box>
        {!isLoading && (
          <SimpleGrid pt={2} columns={{ base: 1, md: 2, lg: 3 }} spacing={"8"}>
            {posts?.map((post: any, index: number) => (
              <GridItem key={index}>
                <CardBlog
                  title={clean(post?.title?.rendered || post?.title)}
                  date={post?.date ? formatDate(post.date) : ""}
                  desc={clean(post?.excerpt?.rendered || post?.excerpt)}
                  tag="Tin tức"
                  bgTag="red.500"
                  image={
                    post?.featured_image ||
                    post?.featuredImage?.node?.mediaItemUrl
                  }
                  path={`/${post?.slug}`}
                />
              </GridItem>
            ))}
          </SimpleGrid>
        )}
        {posts?.length === 0 && !isLoading && (
          <>
            <Center placeItems={"center"} height={"40vh"} textAlign={"center"}>
              Không tìm được kết quả phù hợp
            </Center>
          </>
        )}

        {isLoading && <Loading />}
      </Box>
      {posts?.length > 0 && !resetpagi && (
        <HStack pt={"32px"} justify={"center"}>
          <StyledPaginate
            className="paginate"
            previousLabel="<"
            nextLabel=">"
            pageCount={len}
            onPageChange={handleRouter}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            activeClassName="active"
            forcePage={Number(page) - 1}
          />
        </HStack>
      )}
    </>
  );
};
