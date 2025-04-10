import { GET_PAGE_ABOUT } from "@/app/api/GraphQl/about";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Box, Container, Grid, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

const getAboutData = async () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query: GET_PAGE_ABOUT,
      fetchPolicy: "network-only",
    });

    return response?.data?.allGiIThiU?.nodes?.[0]?.giIThiU || {};
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {};
  }
};

export const About = async () => {
  const aboutData = await getAboutData();
  return (
    <Box color={"blue.800"}>
      <Box bg="radial-gradient(circle, rgba(5,70,89,1) 2%, rgba(98,212,245,1) 100%, rgba(252,89,52,1) 100%)">
        <Container maxW={"6xl"} py="60px">
          <Heading
            as="h2"
            textAlign={"center"}
            size={"lg"}
            pb="16px"
            color={"white"}
          >
            {aboutData.tenGioiThieu || "Giới thiệu Đại học Thái Nguyên"}
          </Heading>
        </Container>
      </Box>

      <Container maxW={"6xl"} py="60px">
        <Heading as="h2" size={{ base: "md" }} py="16px" pb={"10px"}>
          {aboutData.title ||
            "Lịch sử hình thành và phát triển Đại học Thái Nguyên"}
        </Heading>
        <Text>
          {aboutData.description ||
            "Đại học Thái Nguyên (ĐHTN – tên tiếng Anh: ThaiNguyen University; viết tắt là TNU) được thành lập ngày 04/04/1994 theo Nghị định số 31/CP của Chính Phủ trên cơ sở tổ chức sắp xếp lại các trường đại học thuộc địa bàn tỉnh Thái Nguyên."}
        </Text>
        <Grid placeItems={"center"} py={"24px"}>
          <Image
            src={
              aboutData.anhGioiThieu?.node?.mediaItemUrl ||
              "/truong-dai-hoc-nong-lam-thai-nguyen.jpg"
            }
            alt="Đại học Thái Nguyên"
            width={600}
            height={436}
          />
          <Text fontWeight={"bold"}>Trường Đại học Thái Nguyên</Text>
        </Grid>

        {aboutData.label?.map((item: any, index: number) => (
          <Box key={index}>
            <Heading as="h2" size={{ base: "md" }} py="16px" pb={"10px"}>
              {item.title}
            </Heading>
            <Text>{item.description}</Text>
          </Box>
        ))}

        <Box>
          <Heading as="h2" size={{ base: "md" }} py="16px" pb={"10px"}>
            {aboutData.giaTriCotLoi?.text1 || "Giá trị cốt lõi"}
          </Heading>
          <Text fontWeight={"700"}>
            {aboutData.giaTriCotLoi?.text2 ||
              "SÁNG TẠO - NHÂN VĂN - CHẤT LƯỢNG"}
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size={{ base: "md" }} py="16px" pb={"10px"}>
            {aboutData.slogan?.text1 || "Slogan"}
          </Heading>
          <Text fontWeight={"600"}>
            {aboutData.slogan?.text2 ||
              "Cùng kiến tạo những giá trị mới - Together we create new success."}
          </Text>
        </Box>

        {aboutData.label2?.map((item: any, index: number) => (
          <Box key={index}>
            <Heading as="h2" size={{ base: "md" }} py="16px" pb={"10px"}>
              {item.title}
            </Heading>
            <Text>{item.description}</Text>
          </Box>
        ))}
      </Container>
    </Box>
  );
};
