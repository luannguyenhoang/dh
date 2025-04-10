"use client";

import {
  Box,
  Container,
  Flex,
  GridItem,
  Heading,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { InputRes } from "../../components/InputRes";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}a
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export const Footer = ({ footerData }: { footerData?: any }) => {
  const { onToggle, onOpen, onClose, isOpen } = useDisclosure();

  const contactTitle = footerData?.text1 || "Thông tin liên hệ";
  const officeTitle = footerData?.text2 || "Văn phòng tuyển sinh:";
  const hanoiAddress =
    footerData?.text3 ||
    "Hà Nội: Số 116 Trần Vĩ, Phường Mai Dịch, Quận Cầu Giấy, Thành Phố Hà Nội";
  const hcmAddress =
    footerData?.text4 ||
    "Hồ Chí Minh: Số 91 Ký Con, phường Nguyễn Thái Bình, Quận 1, TP Hồ Chí Minh";
  const telLink = footerData?.text5 || "tel:0914709118";
  const hotline = footerData?.text6 || "Hotline: 0914709118";
  const emailLink = footerData?.text7 || "mailto:daihoctructuyen@tnu.edu.vn";
  const email = footerData?.text8 || "Email: daihoctructuyen@tnu.edu.vn";
  const groupLink =
    footerData?.text9 ||
    "https://www.facebook.com/groups/800071498531146?locale=vi_VN";
  const groupText =
    footerData?.text10 ;
  const pageLink =
    footerData?.text11 || "https://www.facebook.com/TNUElearning?locale=vi_VN";
  const pageText =
    footerData?.text12 || "Fanpage: daihocthainguyen - elearning";
  const fbLink = footerData?.text13 || "https://www.facebook.com/TNUElearning";
  const tiktokLink =
    footerData?.text14 || "https://www.tiktok.com/@tnuelearning?";

  return (
    <>
      <Box bg={"#054659"} color={"White"}>
        <Container as={Stack} maxW={"6xl"} py={10}>
          <Flex justify="center" align={"center"} direction="column" mb="32px">
            <Heading size="md" textAlign="center" mb={4}>
              Đăng ký nhận tư vấn
            </Heading>
            <Box maxW="md">
              <InputRes
                placeholder="Nhập email để đăng ký"
                label="Đăng ký"
                onClick={onToggle}
              />
            </Box>
          </Flex>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 5 }} spacing={8}>
            <GridItem colSpan={{ base: 1, sm: 2 }}>
              <Stack align={"flex-start"}>
                <ListHeader>{contactTitle}</ListHeader>
                <Box as={Link} href={"#"}>
                  {officeTitle}
                </Box>
                <UnorderedList>
                  <ListItem>{hanoiAddress}</ListItem>
                  <ListItem>{hcmAddress}</ListItem>
                </UnorderedList>
                <Box as={Link} href={telLink}>
                  {hotline}
                </Box>
                <Box as={Link} href={emailLink}>
                  {email}
                </Box>
                <Box as={Link} href={groupLink} textDecor={"underline"}>
                  {groupText}
                </Box>
                <Box as={Link} href={pageLink} textDecor={"underline"}>
                  {pageText}
                </Box>
              </Stack>
            </GridItem>

            <Stack align={"flex-start"}>
              <ListHeader>Hỗ trợ</ListHeader>
              <Box as={Link} href={"/gioi-thieu"}>
                Về chúng tôi
              </Box>
              <Box as={Link} href={"/lich-khai-giang"}>
                Lịch khai giảng
              </Box>
              <Box as={Link} href={"/dang-ky"}>
                Đăng ký
              </Box>
              <Box as={Link} href={"/tin-tuc"}>
                Tin tức
              </Box>
            </Stack>

            <Stack align={"flex-start"}>
              <ListHeader>Hợp tác tuyển sinh</ListHeader>
              <Link href={"https://timdoitac.aum.edu.vn/"}>
                <Image
                  src={"/timdoitac.jpg"}
                  width={150}
                  height={100}
                  alt="Tìm đối tác"
                  style={{ borderRadius: "6px" }}
                />
              </Link>
            </Stack>

            <Stack align={"flex-start"}>
              <ListHeader>Mạng xã hội</ListHeader>
              <Stack direction={"row"} spacing={6}>
                <SocialButton label={"Facebook"} href={fbLink}>
                  <FaFacebook />
                </SocialButton>
                <SocialButton label={"Tiktok"} href={tiktokLink}>
                  <FaTiktok />
                </SocialButton>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>

        <Box borderTopWidth={1} borderStyle={"solid"} borderColor={"gray.200"}>
          <Container
            as={Stack}
            maxW={"6xl"}
            py={4}
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify={{ md: "center" }}
            align={{ md: "center" }}
          >
            <Text textAlign="center">© 2023 Copyright by IT AUM</Text>
          </Container>
        </Box>
      </Box>
    </>
  );
};
