"use client";

import { FormContact } from "@/components/FormContact";
import { ModalBase } from "@/components/Modal";
import {
  Box,
  Container,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { CardPlace } from "./CardPlace";
import { TableDetail } from "./TableDetail";

const schedule = [
  {
    place: "110 Trường Chinh, Đông Hưng Thuận, Quận 12, HCM",
    phone: "02822002424",
    details: [
      {
        name: "KIDDIE (BEE 1)",
        class: [
          {
            name: "DINO4-43746",
            celandar: "MsHoa Junior - Ca 1 (18h00-19h30, thứ 2,6)",
            startAt: "15/09/2023",
          },
          {
            name: "DINO4-43746",
            celandar: "MsHoa Junior - Ca 1 (18h00-19h30, thứ 2,6)",
            startAt: "15/09/2023",
          },
        ],
      },
    ],
  },
  {
    place: "110 Trường Chinh, Đông Hưng Thuận, Quận 12, HCM",
    phone: "02822002424",
    details: [
      {
        name: "KIDDIE (BEE 1)",
        class: [
          {
            name: "DINO4-43746",
            celandar: "MsHoa Junior - Ca 1 (18h00-19h30, thứ 2,6)",
            startAt: "15/09/2023",
          },
          {
            name: "DINO4-43746",
            celandar: "MsHoa Junior - Ca 1 (18h00-19h30, thứ 2,6)",
            startAt: "15/09/2023",
          },
        ],
      },
    ],
  },
  {
    place: "110 Trường Chinh, Đông Hưng Thuận, Quận 12, HCM",
    phone: "02822002424",
    details: [
      {
        name: "KIDDIE (BEE 1)",
        class: [
          {
            name: "DINO4-43746",
            celandar: "MsHoa Junior - Ca 1 (18h00-19h30, thứ 2,6)",
            startAt: "15/09/2023",
          },
          {
            name: "DINO4-43746",
            celandar: "MsHoa Junior - Ca 1 (18h00-19h30, thứ 2,6)",
            startAt: "15/09/2023",
          },
        ],
      },
    ],
  },
];

export const Schedule = () => {
  const [indexActive, setIndex] = useState(0);
  const { onClose, onOpen, onToggle, isOpen } = useDisclosure();

  return (
    <>
      <Box mb={"62px"}>
        <Box mr={"auto"} ml={"auto"}>
          <Image
            src={`/banner-khai-giang.jpg`}
            width={1920}
            height={600}
            alt="Lịch khai giảng"
            style={{ marginRight: "auto", marginLeft: "auto" }}
          />
        </Box>
        <Container maxW={"6xl"} pt={"42px"}>
          <Heading as={"h2"} size={"lg"} pb={"18px"}>
            Lịch khai giảng các lớp tại TP.Hồ Chí Minh
          </Heading>
          <Text>
            Tiếng Anh là công cụ để khám phá kiến thức, chìa khóa để bước tới
            cánh cửa hội nhập. Học càng sớm, con càng có nhiều cơ hội rộng mở
            trong học tập và trong công việc sau này. Tiếng Anh ngoài giúp con
            phát triển ngôn ngữ, còn giúp con mở rộng thế giới quan, học hỏi
            những điều hay từ nền văn hoá mới, phát triển tư duy đa chiều. Ba mẹ
            còn chần chừ gì mà không giúp con sắm đủ hành trang ngay từ khi còn
            nhỏ để tương lai của con có nhiều cơ hội hơn?
          </Text>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            gap={"32px"}
            mt={"62px"}
          >
            {schedule.map((item, index) => (
              <GridItem key={index}>
                <CardPlace
                  selected={index === indexActive}
                  label={item.place}
                  phone={item.phone}
                  onCLick={() => {
                    setIndex(index);
                  }}
                />
              </GridItem>
            ))}
          </SimpleGrid>

          <Box mt="42px">
            <TableDetail
              courses={schedule[indexActive].details}
              onClick={onToggle}
            />
          </Box>
        </Container>
      </Box>
      <ModalBase isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <FormContact />
      </ModalBase>
    </>
  );
};
