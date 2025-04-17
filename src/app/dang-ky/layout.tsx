import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký học từ xa",
  description: "Thông tin đăng ký học từ xa tại Đại học Thái Nguyên",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;

