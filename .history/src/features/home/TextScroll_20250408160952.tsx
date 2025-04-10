import { TextScroll } from "@/components/TextScroll";

type TextScrollHomePageProps = {
  timelineData?: string[];
};

export const TextScrollHomePage = ({
  timelineData,
}: TextScrollHomePageProps) => {
  const defaultList = [
    "🎓 Lịch khai giảng tại Hà Nội: 15/10/2023",
    "📚 Lịch khai giảng tại Thái Nguyên: 08/10/2023",
    "📖 Lịch khai giảng tại Hồ Chí Minh: 01/10/2023",
    "📝 Lịch khai giảng tại Đà Nẵng: 09/10/2023",
    "🌟 Học bổng 50% cho sinh viên có thành tích xuất sắc",
    "💼 Cơ hội việc làm tại các doanh nghiệp đối tác",
    "📱 Hỗ trợ học tập trực tuyến 24/7",
    "🎯 Chương trình đào tạo chất lượng cao"
  ];

  const listInf =
    timelineData && timelineData.length > 0 ? timelineData : defaultList;

  return <TextScroll list={listInf} />;
};
