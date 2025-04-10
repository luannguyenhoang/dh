import { TextScroll } from "@/components/TextScroll";

type TextScrollHomePageProps = {
  timelineData?: string[];
};

export const TextScrollHomePage = ({
  timelineData,
}: TextScrollHomePageProps) => {
  const defaultList = [
    "Lịch khai giảng tại Hà Nội: 15/10",
    "Lịch khai giảng tại Thái Nguyên: 08/10",
    "Lịch khai giảng tại Hồ Chí Minh: 01/10",
    "Lịch khai giảng tại Đà Nẵng: 09/10",
  ];

  const listInf =
    timelineData && timelineData.length > 0 ? timelineData : defaultList;

  return <TextScroll list={listInf} />;
};
