"use client";

import {
  HStack,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { BiPhone } from "react-icons/bi";
import { BsFacebook, BsMessenger } from "react-icons/bs";
import { MdEmail, MdOutlineMail } from "react-icons/md";
import { SiZalo } from "react-icons/si";
import ReactPaginate from "react-paginate";
import { FormWrapper } from "./FormWrapper";
// import { FormWrapper } from "./FormWrapper";

export const BtnPhone = (BtnPhone?: any) => {
  return (
    <Tooltip
      label={BtnPhone?.BtnPhone?.text_3?.label || "0914709118"}
      placement="left"
      bg={"red.500"}
      hasArrow
    >
      <IconButton
        icon={<BiPhone />}
        size="lg"
        borderRadius={"50% 0 0 50%"}
        color={"white"}
        bg={"red.600"}
        p={"8px"}
        as={"a"}
        href={BtnPhone?.BtnPhone?.text_3?.href || "tel: 0914709118"}
        aria-label="phone"
      />
    </Tooltip>
  );
};

export const BtnZalo = () => {
  return (
    <Tooltip label={"Zalo chat"} placement="left" bg={"blue.500"} hasArrow>
      <IconButton
        icon={<SiZalo />}
        size="lg"
        borderRadius={"50% 0 0 50%"}
        color={"white"}
        bg={"blue.500"}
        p={"8px"}
        as={"a"}
        href={"https://zalo.me/0914.709.118"}
        aria-label="zalo"
      />
    </Tooltip>
  );
};

export const BtnMailN = (BtnMailN?: any) => {
  return (
    <Tooltip
      label={BtnMailN?.BtnMailN?.text_1?.label || "Send email"}
      placement="left"
      bg={"blue.500"}
      hasArrow
    >
      <IconButton
        icon={<MdOutlineMail />}
        size="lg"
        borderRadius={"50% 0 0 50%"}
        color={"white"}
        bg={"blue.500"}
        p={"8px"}
        as={"a"}
        href={
          BtnMailN?.BtnMailN?.text_1?.href ||
          " https://docs.google.com/forms/d/1V6PgSHjjGk72jn66Y2GCIGcrPprgfJxemoke2Zp-dOY/edit"
        }
        aria-label="mailto : "
      />
    </Tooltip>
  );
};
export const BtnMes = (BtnMes?: any) => {
  return (
    <Tooltip
      transition={"all 0.2s"}
      label={BtnMes?.BtnMes?.text_2?.label || "Facebook messenger"}
      placement="left"
      bg={"blue.500"}
      hasArrow
    >
      <IconButton
        icon={<BsMessenger />}
        size="lg"
        borderRadius={"50% 0 0 50%"}
        color={"white"}
        bg={"green.500"}
        p={"8px"}
        transition={"width ease .4s"}
        as={"a"}
        href={BtnMes?.BtnMes?.text_2?.href || "https://m.me/TNUElearning"}
        aria-label="Messenger "
      />
    </Tooltip>
  );
};
export const BtnFB = (BtnFB?: any) => {
  return (
    <Tooltip
      transition={"all 0.2s"}
      label={BtnFB?.BtnFB?.text_4?.label || "Facebook messenger"}
      placement="left"
      bg={"blue.500"}
      hasArrow
    >
      <IconButton
        icon={<BsFacebook />}
        size="lg"
        borderRadius={"50% 0 0 50%"}
        color={"white"}
        bg={"blue.500"}
        p={"8px"}
        transition={"width ease .4s"}
        as={"a"}
        href={
          BtnFB?.BtnFB?.text_4?.href ||
          "https://www.facebook.com/groups/800071498531146?"
        }
        aria-label="facebook"
      />
    </Tooltip>
  );
};

export const BtnEmail = ({
  BtnEmail,
  formData,
}: {
  BtnEmail?: any;
  formData?: any;
}) => {
  return (
    <Popover placement="left" trigger="hover">
      <PopoverTrigger>
        <HStack
          spacing={0}
          borderRadius={0}
          bg={"orange.500"}
          transform={"rotate(270deg)"}
        >
          <IconButton
            icon={<MdEmail />}
            size="lg"
            _hover={{}}
            color={"white"}
            bg={"orange.500"}
            p={"8px"}
            aria-label="email"
          />
          <Text pr={2} color={"white"}>
            {BtnEmail?.tu_van_ngay?.title || "Tư vấn ngay"}
          </Text>
        </HStack>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader as={Heading} size={"md"} textAlign={"center"}>
          Để lại thông tin
        </PopoverHeader>
        <PopoverBody>
          <FormWrapper type="form-poup" />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const StyledPaginate = styled(ReactPaginate)`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0 0.5rem;

  li a {
    border-radius: 7px;
    padding: 0rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
    margin-right: 4px;
    margin-left: 4px;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;
