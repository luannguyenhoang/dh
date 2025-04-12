import { Heading, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({ dataLogo }: { dataLogo?: any }) => {
  return (
    <Link
      href="/"
      style={{ display: "flex", alignItems: "center", gap: "12px" }}
      prefetch={false}
    >
      <Image
        priority
        width={65}
        height={65}
        style={{ borderRadius: "50%" }}
        src={`/logo-dhthainguyen.png`}
        alt="logo Đại học Thái nguyên"
      />
      <VStack color={"#028dbf"} align={"start"} spacing={3}>
        <Heading as="h1" size={{ base: "sm", lg: "md" }}>
          {dataLogo?.name || ""}
        </Heading>
        <Heading as="h2" fontSize={{ base: ".8rem" }}>
          {dataLogo?.tag || ""}
        </Heading>
      </VStack>
    </Link>
  );
};
