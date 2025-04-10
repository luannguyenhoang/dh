"use client";
import { Loading } from "@/components/Loading";
import { Box, Flex, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const BtnMes = dynamic(
  () => import("@/components/BtnCTA").then((mod) => mod.BtnMes),
  {
    loading: () => <Loading />,
  }
);
const BtnPhone = dynamic(
  () => import("@/components/BtnCTA").then((mod) => mod.BtnPhone),
  {
    loading: () => <Loading />,
  }
);
const BtnFB = dynamic(
  () => import("@/components/BtnCTA").then((mod) => mod.BtnFB),
  {
    loading: () => <Loading />,
  }
);
const BtnEmail = dynamic(
  () => import("@/components/BtnCTA").then((mod) => mod.BtnEmail),
  {
    loading: () => <Loading />,
  }
);
const BtnMailN = dynamic(
  () => import("@/components/BtnCTA").then((mod) => mod.BtnMailN),
  {
    loading: () => <Loading />,
  }
);

export const CTA = ({ ctaData = {}, formData = {} }: { ctaData?: any, formData?: any }) => {
  const findButtonByLabel = (label: string) => {
    if (!ctaData?.path || !Array.isArray(ctaData.path)) return null;

    return ctaData.path.find(
      (item: any) =>
        item.label && item.label.toLowerCase().includes(label.toLowerCase())
    );
  };
  const fbButton = findButtonByLabel("facebook");
  const messengerButton = findButtonByLabel("messenger");
  const emailButton = findButtonByLabel("email");
  const phoneData = ctaData?.text3 || null;
  const tuVanNgayTitle = ctaData?.tuVanNgay?.title || "Tư vấn ngay";

  return (
    <Box
      pos={"fixed"}
      top={{ lg: "50%", base: "60%" }}
      right={"0"}
      className="CTA"
      zIndex={7}
    >
      <Flex
        key={"e1"}
        height={"160px"}
        width={"200px"}
        alignItems={"center"}
        top={"-82%"}
        left={"-105%"}
        position={"absolute"}
      >
        <BtnEmail BtnEmail={{ tu_van_ngay: { title: tuVanNgayTitle } }} formData={formData} />
      </Flex>
      <VStack gap={0} alignItems={"flex-end"}>
        <BtnMailN BtnMailN={{ text_1: emailButton }} />
        <BtnMes BtnMes={{ text_2: messengerButton }} />
        <BtnPhone BtnPhone={{ text_3: phoneData }} />
        <BtnFB BtnFB={{ text_4: fbButton }} />
      </VStack>
    </Box>
  );
};
