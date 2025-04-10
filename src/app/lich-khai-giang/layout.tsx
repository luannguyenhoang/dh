import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lịch khai giảng",
  description:
    "Thông tin chi tiết lịch khai giảng hệ từ xa Đại học Thái Nguyên",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
