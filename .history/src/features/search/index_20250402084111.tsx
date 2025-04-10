"use client";

import { deleteSpace } from "@/ultil/deleteSpace";
import { toSlug } from "@/ultil/toSlug";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  Text
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ListSearchPosts = dynamic(
  () => import("./ListSearchPosts").then((mod) => mod.ListSearchPosts),
);

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [keyWord, setKeyWord] = useState<any>();
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();
  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const str = toSlug({ input: searchQuery });

    if (str != "") {
      router.push(`/tim-kiem?keyword=${str}&page=1`);
    } else {
      setIsCorrect(true);
    }
  };
  useEffect(() => {
    const str = toSlug({ input: searchQuery });
    if (searchQuery != "" && str == "") {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const { keyword } = router.query;
    setKeyWord(
      Array.isArray(keyword) ? keyword[0] || "" : (keyword as string) || ""
    );
  }, [router.query]);

  const handleRouter = ({ selected }: { selected: number }) => {
    router.push(`/tim-kiem?keyword=${keyWord}&page=${selected + 1}`);
  };

  return (
    <>
      <Box
        height={"350px"}
        position={"relative"}
        py="120px"
        display={"flex"}
        flexDirection="column"
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          w={"100%"}
          h={"100%"}
          bgColor={"#07294dc0"}
          opacity={0.8}
          zIndex={"1"}
        ></Box>
        <Image
          src={"/banner-tnu2.png"}
          alt="image-alt-text"
          layout="fill"
          objectFit="cover"
          objectPosition="0 80%"
        />
        <Container maxW={"7xl"} zIndex={2}>
          <Box>
            <Box justifyContent={"center"} pb={16}>
              <form onSubmit={onSearch}>
                <HStack justifyContent={"center"} columnGap={0}>
                  <Input
                    required
                    value={searchQuery}
                    type="Text"
                    border={"1px solid #ffffff "}
                    borderRadius={"15px 0 0 15px"}
                    bgColor={"white"}
                    color={"black"}
                    maxW={"2xl"}
                    size="lg"
                    focusBorderColor="#008AFA"
                    placeholder="Nhập vào từ khóa..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    borderRadius={"0 15px 15px 0"}
                    onClick={onSearch}
                    color={"#131313"}
                    size="lg"
                    border={"2px solid #008AFA"}
                    bg={"#008AFA"}
                    transition={"ease-in-out .4s"}
                    _hover={{
                      border: "2px solid #008AFA",
                      background: "white",
                      color: " #131313",
                      transition: "0.4s ease-in-out"
                    }}
                  >
                    Tìm kiếm
                  </Button>
                </HStack>
              </form>
            </Box>
            {isCorrect && (
              <Box
                pt={2}
                display={"flex"}
                color={"white"}
                justifyContent={"center"}
              >
                <Text>Tìm kiếm của bạn mang lại không có kết quả.</Text>
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      <Container maxW={"8xl"} py={"70px"}>
        <Box minH={"300px"}>
          {keyWord !== "" && (
            <>
              <Heading
                size={"xl"}
                color={"#07294d"}
                pb={"40px"}
                textAlign={{ base: "center", lg: "center" }}
              >
                Kết quả tìm kiếm : {deleteSpace(keyWord)}
              </Heading>
              <ListSearchPosts handleRouter={handleRouter} />
            </>
          )}
        </Box>
      </Container>
    </>
  );
};
