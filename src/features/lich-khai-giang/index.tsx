"use client";

import { Frame } from "@/components/Frame";
import { Loading } from "@/components/Loading";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { useEffect, useState } from "react";

export const LichKg = ({ serverData }: { serverData?: any }) => {
  const [labelList, setLabelList] = useState<string[]>([]);

  useEffect(() => {
    if (serverData?.lChKhaiGiNg?.section1?.label) {
      const label = serverData.lChKhaiGiNg.section1.label;
      const lines = label.split(/\r?\n/);
      setLabelList(lines.filter((line: string) => line.trim() !== ""));
    }
  }, [serverData]);

  const lichData = serverData?.lChKhaiGiNg;
  const isLoading = !serverData || !lichData;

  return (
    <LayoutNganh
      title="Lịch khai giảng Đại học Thái Nguyên - E learning"
      data={lichData?.thongBao}
    >
      {!isLoading && (
        <Frame
          title1={lichData?.section1?.title}
          list1={labelList}
          label="Đăng ký tư vấn"
        />
      )}

      {isLoading && <Loading height="10vh" />}
    </LayoutNganh>
  );
};
