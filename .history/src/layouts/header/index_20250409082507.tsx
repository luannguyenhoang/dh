"use client";

import { BtnTheme } from "@/components/BtnTheme";
import { ModalBase } from "@/components/Modal";

import { Box, Container, Divider, Flex } from "@chakra-ui/react";
import { DesktopNav } from "../components/DeskhopNav";
import { HeaderTop } from "../components/HeaderTop";
import { MobileNav } from "../components/MobileNav";
import { FormWrapper } from "@/components/FormWrapper";
import { useModal } from "@/components/ModalContext";
import { useEffect } from "react";

export const Header = () => {
  const { onToggle, onOpen, onClose, isOpen } = useModal();
  
  useEffect(() => {
    // Mở modal tự động khi component được mount
    onOpen && onOpen();
  }, [onOpen]);
  
  return (
    <>
      <Box
        pos={"relative"}
        _before={{
          content: "''",
          width: "5e3px",
          height: "100%",
          backgroundImage:
            "-webkit-gradient(linear,left top,left bottom,from(#004685),to(#004956e6));",
          position: "absolute",
          top: 0,
          right: "70%",
          zIndex: -1,
          transform: "skew(-30deg)",
          WebkitTransformOrigin: "left bottom",
        }}
      >
        <Container maxW="6xl" py="6px">
          <HeaderTop hasSearch />
        </Container>
      </Box>
      <Divider />
      <Box
        boxShadow="md"
        pos={"sticky"}
        top={"0"}
        left={0}
        right={0}
        zIndex={10}
        bg={"white"}
      >
        <Container
          as={Flex}
          bg={"white"}
          color={"gray.600"}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          align={"center"}
          maxW="6xl"
        >
          <Flex ml={{ base: -2 }} display={{ base: "flex", lg: "none" }}>
            <MobileNav />
          </Flex>
          <Flex
            flex={{ base: 1 }}
            justify={{ base: "center", lg: "start" }}
            align={"center"}
          >
            <Flex display={{ base: "none", lg: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
          <BtnTheme
            colorScheme="red"
            size={{ base: "sm", md: "lg" }}
            onClick={onToggle}
          >
            Đăng ký tư vấn
          </BtnTheme>
        </Container>
      </Box>

      <ModalBase
        isOpen={isOpen || false}
        onOpen={() => onOpen && onOpen()}
        onClose={() => onClose && onClose()}
      >
        <FormWrapper type="form-poup" title="Để lại thông tin" />
      </ModalBase>
    </>
  );
};
