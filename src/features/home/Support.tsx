import { HeadSection } from "@/components/HeadSection";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  GridItem,
  HStack,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { IconType } from "react-icons";
import { defaultDataSupport } from "../../ultil/DefaultData/defaultDataSupport";

export const AccSupport = ({ supportItems = defaultDataSupport.supportItems }) => {
  return (
    <Accordion allowMultiple>
      {supportItems.map((acc, index) => {
        const Icon = acc.iconType;
        return (
          <AccordionItem
            border={"none"}
            key={index}
            py={"12px"}
            color={"red.700"}
          >
            <AccordionButton bg={"gray.50"} py="16px" rounded={"md"}>
              <Box flex="1" textAlign="left">
                <HStack>
                  <Icon />
                  <Heading
                    fontSize={{ base: "sm", md: "md" }}
                    color={"green.900"}
                  >
                    {acc.title}
                  </Heading>
                </HStack>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} color={"green.900"}>
              {acc.content}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export const Support = ({ supportData }: { supportData?: any }) => {
  const title = supportData?.tieuDe || defaultDataSupport.title;
  const desc = supportData?.noiDung || defaultDataSupport.desc;
  const imageSrc = supportData?.cot?.anh?.node?.mediaItemUrl || defaultDataSupport.imageSrc;

  let supportItems = defaultDataSupport.supportItems;
  const iconComponents = defaultDataSupport.iconComponents;

  if (supportData?.cot?.tabs?.list) {
    supportItems = supportData.cot.tabs.list.map((item: any, index: number) => {
      const IconType = iconComponents[index % iconComponents.length] || iconComponents[0];
      return {
        iconType: IconType,
        title: item.text1 || "",
        content: item.text2 || "",
      };
    });
  }

  return (
    <Box
      bg={"linear-gradient(180deg, rgba(255, 255, 255, 1), #D6F5FE 100%)"}
      py={"48px"}
    >
      <Container maxW={"6xl"}>
        <HeadSection title={title} subtitle="hỗ trợ" desc={desc} />
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={"36px"} pt={"24px"}>
          <GridItem>
            <Image
              src={imageSrc}
              alt="Kết hợp online và oflinet"
              width={600}
              height={400}
              style={{ borderRadius: "12px" }}
            />
            <Text fontWeight={"bold"} textAlign={"center"}>
              Hỗ trợ - Đại học Thái Nguyên
            </Text>
          </GridItem>
          <GridItem>
            <AccSupport supportItems={supportItems} />
          </GridItem>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
