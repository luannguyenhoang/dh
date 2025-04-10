import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ngành điện tử viễn thông",
  description:
    "Tuyển sinh đại học từ xa ngành điện tử viễn thông - Đại học Thái nguyên, nhận bằng đại học tại nhà",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
