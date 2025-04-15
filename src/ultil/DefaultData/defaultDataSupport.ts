import { IconType } from "react-icons";
import { GiSpookyHouse } from "react-icons/gi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

export interface SupportItem {
  iconType: IconType;
  title: string;
  content: string;
}

export const defaultDataSupport = {
  title: "Hỗ trợ của chúng tôi",
  desc: "Đại học Thái Nguyên hỗ trợ bạn nhiều lợi ích",
  imageSrc: "/support.png",
  iconComponents: [
    GiSpookyHouse,
    SlCalender,
    MdOutlineLocalShipping,
  ] as IconType[],
  supportItems: [
    {
      iconType: GiSpookyHouse,
      title: "Sở hữu Bằng Đại học uy tín",
      content:
        "Bằng Cử nhân không ghi hình thức đào tạo và được Bộ Giáo dục công nhận, Có giá trị sử dụng trọn đời",
    },
    {
      iconType: SlCalender,
      title: "Thời gian đào tạo",
      content:
        "Thời gian đào tạo tùy vào đối tượng từ 2-2,5 năm. Người học có thể rút ngắn thời gian học tập theo quy chế đào tạo",
    },
    {
      iconType: MdOutlineLocalShipping,
      title: "Kho học liệu hoàn toàn miễn phí",
      content:
        "Tài liệu học tập đa Phương tiện (video, slide, script,...), giáo trình do Đại học Thái Nguyên biên soạn",
    },
  ],
};
