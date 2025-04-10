"use client";

import { HeadSection } from "@/components/HeadSection";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import parse from "html-react-parser";
import Image from "next/image";
import { BiPlus } from "react-icons/bi";

type AccordionItem = {
  title: string;
  content: string;
};

type NotifyProps = {
  notifyData?: any;
};

export const Accs = ({ accs }: { accs: AccordionItem[] }) => (
  <Accordion defaultIndex={[0]} allowToggle>
    {accs.map((acc, index) => (
      <AccordionItem border="none" key={index} py="12px" rounded="sm">
        <AccordionButton bg="gray.50" py="16px" rounded="sm">
          <Box flex="1" textAlign="left">
            <HStack>
              <Heading fontSize={{ base: "sm", md: "md" }}>{acc.title}</Heading>
            </HStack>
          </Box>
          <Icon as={BiPlus} />
        </AccordionButton>
        <AccordionPanel pb={4} color="gray.900">
          {parse(acc.content)}
        </AccordionPanel>
      </AccordionItem>
    ))}
  </Accordion>
);

const defaultData = [
  {
    title: "Đối tượng tuyển sinh",
    detail: [
      {
        title: "",
        list: [
          "Từ 18 tuổi trở lên",
          "Cán bộ công chức, những người đang làm việc trong cơ quan, tổ chức, doanh nghiệp nhà nước, tư nhân, lực lượng vũ trang, đã có bằng THPT hoặc tương đương trở lên (THCN, CĐ, ĐH…).",
          "Sinh viên đang học tại các trường Cao đẳng, Đại học.",
          "Người đã có bằng Đại học, Cao đẳng, Trung cấp,….",
          "Học sinh vừa tốt nghiệp THPT.",
        ],
      },
    ],
  },
  {
    title: "Hình thức tuyển sinh",
    detail: [
      {
        title: "",
        list: [
          "Chương trình Đào tạo từ xa của Đại học Thái Nguyên (TNU) chỉ áp dụng hình thức xét tuyển đầu vào (không thi tuyển), áp dụng với mọi đối tượng học viên.",
        ],
      },
    ],
  },
  {
    title: "Yêu cầu",
    detail: [
      {
        title: "Yêu cầu bằng cấp:",
        list: [
          "Tốt nghiệp phổ thông hoặc tương đương theo quy định của Bộ Giáo dục và Đào tạo.",
          "Tốt nghiệp trung cấp, cao đẳng, cao đẳng nghề, đại học cùng ngành hoặc một ngành khác để được miễn giảm môn học và tín chỉ.",
        ],
      },
      {
        title: "Yêu cầu pháp lý:",
        list: [
          "Mọi công dân đang không trong thời gian truy cứu trách nhiệm hình sự.",
        ],
      },
      {
        title: "Yêu cầu thiết bị học tập:",
        list: [
          "Với hơn 90% nội dung học tập được thực hiện qua mạng internet. Phần lớn nội dung học tập có thể thực hiện trên thiết bị di động nhưng việc làm bài tập một số môn học có thể phải sử dụng máy tính để bàn hoặc máy tính xách tay. Vì vậy người học cần đảm bảo các điều kiện tối thiểu sau:",
          "Máy tính để bàn/máy tính xách tay.",
          "Đường truyền internet ổn định.",
        ],
      },
    ],
  },
  {
    title: "Lịch khai giảng",
    detail: [
      {
        title: "",
        list: [
          "Tại Tp.HCM: 14/05/2023",
          "Tại Thái Nguyên: 28/05/2023",
          "Tại Hà Nội: 21/05/2023",
          "Tại Đà Nẵng: 30/07/2023",
        ],
      },
    ],
  },
  {
    title: "Nơi tiếp nhận hồ sơ",
    detail: [
      {
        title: "Trạm tuyển sinh Đại học Thái Nguyên:",
        list: [
          "Hà Nội: Số 116 Trần Vỹ, Mai Dịch, Cầu Giấy, Hà Nội",
          "Hồ Chí Minh: Tầng 1, số 81 Điện Biên Phủ, phường Đa Kao, Quận 1, TP.HCM",
          "Hotline: 094.1010.044",
          "Email: daihoctructuyen@tnu.edu.vn",
        ],
      },
    ],
  },
  {
    title: "Văn bằng sau tốt nghiệp",
    detail: [
      {
        title: "Sau khi tốt nghiệp học viên sẽ được:",
        list: [
          "Cấp bằng Cử nhân Đại học Thái Nguyên.",
          "Văn bằng do Đại học do Đại học Thái Nguyên cấp, được Bộ GD&ĐT công nhận.",
          'Văn bằng tốt nghiệp có giá trị tương đương bằng "CHÍNH QUY" và không còn ghi hình thức đào tạo là "TỪ XA".',
          "Bằng cấp được Bộ GD&ĐT công nhận, có giá trị sử dụng suốt đời trên phạm vi toàn quốc.",
          "Học viên tốt nghiệp được đăng ký dự thi ở các bậc học cao hơn.",
          "Có thể học lên các bậc học cao hơn như Thạc sỹ, Tiến sỹ, thi công chức theo đúng quy định của nhà nước…",
        ],
      },
    ],
  },
];

const convertDefaultData = () => {
  return defaultData.map((item) => {
    let htmlContent = "";

    item.detail.forEach((detailItem) => {
      if (detailItem.title) {
        htmlContent += `<h4 class="chakra-heading"><strong>${detailItem.title}</strong></h4>`;
      }

      if (detailItem.list?.length) {
        htmlContent += "<ul>";
        detailItem.list.forEach((listItem) => {
          htmlContent += `<li>${listItem}</li>`;
        });
        htmlContent += "</ul>";
      }
    });

    return {
      title: item.title,
      content: htmlContent,
    };
  });
};

const processApiData = (notifyData: any): AccordionItem[] => {
  if (notifyData?.cot?.cot1 && Array.isArray(notifyData.cot.cot1)) {
    return notifyData.cot.cot1.map((item: any) => ({
      title: item.title,
      content: item.noiDung,
    }));
  }

  if (notifyData?.cot?.list) {
    return notifyData.cot.list.map((item: any) => ({
      title: item.item.title,
      content: item.item.description.map((desc: any) => desc.text).join(""),
    }));
  }

  if (notifyData?.tuyenSinh?.label1?.child) {
    return notifyData.tuyenSinh.label1.child.map((item: any) => ({
      title: item.title,
      content: item.text,
    }));
  }

  return convertDefaultData();
};

export const Notify = ({ notifyData }: NotifyProps) => {
  const title = notifyData?.tieuDe || "Thông báo tuyển sinh";
  const desc =
    notifyData?.noiDung ||
    "Thông báo tuyển sinh hệ từ xa Đại học Thái Nguyên 2023";
  const imageSrc =
    notifyData?.cot?.anh?.node?.mediaItemUrl || "/phoi-bang-dh-thai-nguyen.jpg";
  const accData = processApiData(notifyData);

  return (
    <Container maxW="6xl">
      <HeadSection title={title} subtitle="thông báo" desc={desc} />
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="32px" pt="24px">
        <GridItem>
          <Accs accs={accData} />
        </GridItem>
        <GridItem>
          <Image
            src={imageSrc}
            alt="Phôi bằng Đại học Thái Nguyên"
            width={500}
            height={700}
          />
          <Text textAlign="center" fontWeight="bold">
            Phôi bằng Đại học Thái Nguyên
          </Text>
        </GridItem>
      </SimpleGrid>
    </Container>
  );
};
