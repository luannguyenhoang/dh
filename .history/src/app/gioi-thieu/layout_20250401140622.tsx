import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu - Đại học Thái Nguyên",
  description: "Thông tin giới thiệu vể Đại học Thái Nguyên",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
