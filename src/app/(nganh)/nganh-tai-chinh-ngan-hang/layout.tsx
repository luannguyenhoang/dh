import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ngành tài chính ngân hàng",
  description:
    "Tuyển sinh đại học từ xa ngành tài chính ngân hàng - Đại học Thái nguyên, nhận bằng đại học tại nhà",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
