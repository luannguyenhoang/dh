"use client";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Input,
  useDisclosure,
  Text,
  HStack
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { toSlug } from "@/ultil/toSlug";

export const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [checkInput, setCheckInput] = useState(false);

  // const onSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const str = toSlug({ input: searchQuery });
  //   if (str !== "") {
  //     router.push(`/tim-kiem?keyword=${str}&page=1`);
  //     onClose(); // Close the drawer after search
  //   }
  //   setSearchQuery("");
  // };

  // useEffect(() => {
  //   const str = toSlug({ input: searchQuery });
  //   if (searchQuery !== "" && str === "") {
  //     setCheckInput(true);
  //   } else {
  //     setCheckInput(false);
  //   }
  // }, [searchQuery]);

  return (
    <>
      <Button ref={btnRef} colorScheme="outline" onClick={onOpen}>
        <Icon as={FiSearch} w={"24px"} h={"24px"} color="gray.800" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tìm kiếm bài viết</DrawerHeader>
          <DrawerBody>
            <form 
            // onSubmit={onSearch}
            >
              <HStack>
                <Input
                  required
                  bg={"white"}
                  value={searchQuery}
                  border={"1px solid #BFBFBF "}
                  borderRadius={10}
                  px={4}
                  placeholder="Tìm kiếm..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  color={"#ffffff"}
                  size={"2xl"}
                  border={"2px solid #028dbf"}
                  borderRadius={"10px"}
                  p={"10px 10px"}
                  bg={"#028dbf"}
                  transition={"ease-in-out .4s"}
                  _hover={{
                    border: "2px solid #028dbf",
                    background: "white",
                    color: "#028dbf",
                    transition: "0.4s ease-in-out"
                  }}
                  // onClick={onSearch}
                >
                  Tìm kiếm
                </Button>
              </HStack>
            </form>
            {checkInput && (
              <Box
                pt={2}
                display={"flex"}
                color={"#f5222d"}
                justifyContent={"center"}
              >
                <Text>Từ khóa tìm kiếm không hợp lệ</Text>
              </Box>
            )}
          </DrawerBody>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </>
  );
};
