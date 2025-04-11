"use client";

import { HeadSection } from "@/components/HeadSection";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { defaultDataReview } from "../../DefaultData/defaultDataReview";

interface Props {
  children: React.ReactNode;
}

const Testimonial = (props: Props) => {
  const { children } = props;
  return <Box>{children}</Box>;
};

const TestimonialContent = (props: Props) => {
  const { children } = props;
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = (props: Props) => {
  const { children } = props;
  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = (props: Props) => {
  const { children } = props;
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  role,
}: {
  src: string;
  name: string;
  role: string;
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      {src ? (
        <Avatar src={src} size="md" mb={2} />
      ) : (
        <Avatar name={name} mb={2} bg={"#0b434a"} color={"white"} />
      )}
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {role}
        </Text>
      </Stack>
    </Flex>
  );
};

export const Review = ({ reviewData }: { reviewData?: any }) => {
  const title = reviewData?.tieuDe || defaultDataReview.title;
  const desc = reviewData?.noiDung || defaultDataReview.desc;

  let reviews = defaultDataReview.reviews;

  if (reviewData?.comment?.list && reviewData.comment.list.length > 0) {
    reviews = reviewData.comment.list.map((item: any) => ({
      name: item.text1,
      content: item.text2,
      title: item.text3,
      role: item.text4,
      imageSrc: item.anh?.node?.mediaItemUrl,
    }));
  }

  return (
    <Box
      bg={"linear-gradient(180deg, rgba(255, 255, 255, 1), #D6F5FE 100%)"}
      py={"48px"}
    >
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <HeadSection subtitle="đánh giá" title={title} desc={desc} />
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          {reviews.map((review, index) => (
            <Testimonial key={index}>
              <TestimonialContent>
                <TestimonialHeading>{review.name}</TestimonialHeading>
                <TestimonialText>{review.content}</TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={review.imageSrc}
                name={review.name}
                role={review.role}
              />
            </Testimonial>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};
