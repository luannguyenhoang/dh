import { HStack, Icon, Link, Tag, TagLabel } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";

const Search = dynamic(() =>
  import("@/layouts/components/Search").then((mod) => mod.Search)
);
const Logo = dynamic(() =>
  import("@/layouts/components/Logo").then((mod) => mod.Logo)
);

export const Tags = ({
  label,
  type,
  children,
}: {
  label: string;
  type: string;
  children: ReactNode;
}) => {
  return (
    <Tag
      borderRadius="full"
      variant="solid"
      bg={"linear-gradient(70deg, #f68920 0%, #fc5934 100%)"}
      py="8px"
      px="8px"
      as={Link}
      href={`${type}:${label}`}
    >
      {children}
      <TagLabel fontSize={{ base: ".6rem", md: "sm" }}>{label}</TagLabel>
    </Tag>
  );
};

export const HeaderTop = ({
  hasSearch,
  dataHeader,
}: {
  hasSearch?: boolean;
  dataHeader: any;
}) => {
  return (
    <HStack align={"center"} justify={"space-between"}>
      <HStack flex={1}>
        <Tags type="tel" label={dataHeader?.phoneNumber || "0914709118"}>
          <Icon as={LuPhone} />
        </Tags>

        <Tags
          type="mailto"
          label={dataHeader?.email || "daihoctructuyen@tnu.edu.vn"}
        >
          <Icon as={MdOutlineMail} />
        </Tags>
      </HStack>

      <HStack
        flex={1}
        justify={"center"}
        display={{ base: "none", lg: "flex" }}
      >
        <Logo dataLogo={dataHeader} />
      </HStack>

      {hasSearch && (
        <HStack flex={1} justify={"end"}>
          <Search />
        </HStack>
      )}
    </HStack>
  );
};
