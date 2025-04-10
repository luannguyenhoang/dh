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
  List,
  ListItem,
  Text
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ListSearchPosts = dynamic(() =>
  import("./ListSearchPosts").then((mod) => mod.ListSearchPosts)
);

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [keyWord, setKeyWord] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`/api/search?search=${query}&page=1`);
      const data = await response.json();
      setSuggestions(data.posts || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 1) {
      fetchSuggestions(value);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    const slug = toSlug({ input: suggestion.title });
    router.push(`/tim-kiem?keyword=${slug}&page=1`);
    setShowSuggestions(false);
    setSearchQuery(suggestion.title);
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const str = toSlug({ input: searchQuery });

    if (str !== "") {
      router.push(`/tim-kiem?keyword=${str}&page=1`);
    } else {
      setIsCorrect(true);
    }
  };

  useEffect(() => {
    const str = toSlug({ input: searchQuery });
    if (searchQuery !== "" && str === "") {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const keyword = searchParams.get("keyword") || "";
    setKeyWord(keyword);
  }, [searchParams]);

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
          <Box position="relative">
            <Box justifyContent={"center"} pb={16}>
              <form onSubmit={onSearch}>
                <HStack justifyContent={"center"} columnGap={0}>
                  <Box position="relative" width="100%" maxW="2xl">
                    <Input
                      required
                      value={searchQuery}
                      type="Text"
                      border={"1px solid #ffffff"}
                      borderRadius={"15px 0 0 15px"}
                      bgColor={"white"}
                      color={"black"}
                      size="lg"
                      focusBorderColor="#008AFA"
                      placeholder="Nhập vào từ khóa..."
                      onChange={handleInputChange}
                      onFocus={() => setShowSuggestions(true)}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <List
                        position="absolute"
                        top="100%"
                        left="0"
                        right="0"
                        bg="white"
                        boxShadow="lg"
                        borderRadius="md"
                        maxH="300px"
                        overflowY="auto"
                        zIndex={3}
                      >
                        {suggestions.map((suggestion, index) => (
                          <ListItem
                            key={index}
                            p={3}
                            cursor="pointer"
                            _hover={{ bg: "gray.100" }}
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            <Text noOfLines={2}>{suggestion.title}</Text>
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </Box>
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
                      transition: "0.4s ease-in-out",
                    }}
                  >
                    Tìm kiếm
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
                Kết quả tìm kiếm : {deleteSpace(keyWord)}
              </Heading>
              <ListSearchPosts handleRouter={handleRouter} />
            </>
          )}
        </Box>
      </Container>
    </>
  );
};
