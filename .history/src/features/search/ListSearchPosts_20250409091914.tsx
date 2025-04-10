"use client";

import { Loading } from "@/components/Loading";
import { clean } from "@/lib/sanitizeHtml";
import { formatDate } from "@/ultil/date";
import { toSlug } from "@/ultil/toSlug";
import { 
  Box, 
  Button, 
  Center, 
  Code, 
  Divider, 
  GridItem, 
  HStack, 
  Heading, 
  SimpleGrid, 
  Text 
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import dynamic from "next/dynamic"

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
  handleRouter
}: {
  handleRouter?: ({
    // eslint-disable-next-line no-unused-vars
    selected,
    // eslint-disable-next-line no-unused-vars
    searchText
  }: {
    selected: number;
    searchText: string;
  }) => void;
}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const [resetpagi, setResetpagi] = useState(false);
  const [searchData, setSearchData] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [showDebug, setShowDebug] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const keyword = searchParams.get('keyword') || '';
  const page = searchParams.get('page') || '1';
  
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
          `/api/search/?type=news&page=${pages}&search=${toSlug({
            type: "signed",
            input: keywords
          })}`,
          {
            cache: 'no-store'
          }
        );
        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }
        const data: { posts: any[]; totalPosts: string; debug: any } = await res.json();
        const { posts, totalPosts, debug } = data;
        totalPosts && setTotalPosts(totalPosts);
        setPosts(posts);
        
        // Lưu thông tin debug
        setDebugInfo(debug);
        
        // Lưu dữ liệu để hiển thị log
        setSearchData({
          keyword: keywords,
          page: pages,
          totalFound: totalPosts,
          posts: posts.map(post => ({
            title: post.title?.rendered || post.title,
            slug: post.slug,
            date: post.date
          }))
        });
        
        console.log("Kết quả tìm kiếm:", {
          keyword: keywords,
          page: pages,
          totalFound: totalPosts,
          posts: posts,
          debug: debug
        });
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
        <Button 
          mb={4} 
          colorScheme="blue" 
          variant="outline" 
          size="sm"
          onClick={() => setShowDebug(!showDebug)}
        >
          {showDebug ? "Ẩn chi tiết tìm kiếm" : "Hiển thị chi tiết tìm kiếm"}
        </Button>
        
        {searchData && debugInfo && !isLoading && showDebug && (
          <Box my={4} p={4} borderWidth="1px" borderRadius="lg" bg="gray.50">
            <Heading size="md" mb={3}>Chi tiết tìm kiếm</Heading>
            
            <Text fontWeight="bold">Thông tin tìm kiếm:</Text>
            <Text>Từ khóa: {debugInfo.searchQuery}</Text>
            <Text>Trang: {debugInfo.page}</Text>
            <Text>Loại tìm kiếm: {debugInfo.type}</Text>
            <Text>Tiêu chí lọc: {debugInfo.filterCriteria}</Text>
            <Text>Thời gian thực hiện: {new Date(debugInfo.timestamp).toLocaleString()}</Text>
            
            <Divider my={2} />
            
            <Text fontWeight="bold">Kết quả:</Text>
            <Text>Tổng bài viết trước khi lọc: {debugInfo.totalBeforeFilter}</Text>
            <Text>Tổng bài viết sau khi lọc: {debugInfo.totalAfterFilter}</Text>
            <Text>Số kết quả hiển thị trên trang này: {debugInfo.displayedResults}</Text>
            
            <Divider my={2} />
            
            <Text fontWeight="bold">Danh sách bài viết tìm thấy:</Text>
            {posts.length > 0 ? (
              posts.map((post: any, index: number) => (
                <Text key={index}>{index + 1}. {post.title?.rendered || post.title}</Text>
              ))
            ) : (
              <Text color="red.500">Không tìm thấy kết quả nào</Text>
            )}
            
            <Divider my={2} />
            
            <Text fontWeight="bold">Dữ liệu API:</Text>
            <Code p={2} borderRadius="md" fontSize="sm" whiteSpace="pre-wrap">
              {JSON.stringify(debugInfo, null, 2)}
            </Code>
          </Box>
        )}
      
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
                  image={post?.featured_image || post?.featuredImage?.node?.mediaItemUrl}
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
