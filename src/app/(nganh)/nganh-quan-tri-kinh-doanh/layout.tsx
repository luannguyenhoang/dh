import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ngành quản trị kinh doanh",
  description:
    "Tuyển sinh đại học từ xa ngành quản trị kinh doanh - Đại học Thái nguyên, nhận bằng đại học tại nhà",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
