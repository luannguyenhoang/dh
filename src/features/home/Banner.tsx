"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";
export const Banner = ({ bannerData }: { bannerData?: any }) => {
  return (
    <Box>
      <Box h={{ lg: "50vh", md: "400px", base: "280px" }} position={"relative"}>
        <Image
          src={
            bannerData?.anhBanner?.node?.mediaItemUrl ||
            "/dai-hoc-thai-nguyen.jpg"
          }
          width={1920}
          height={1080}
          alt="Đại học Thái Nguyên"
          priority
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
};
