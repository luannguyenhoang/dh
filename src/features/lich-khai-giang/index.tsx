"use client";

import { Loading } from "@/components/Loading";
import { LayoutNganh } from "@/layouts/layoutNganh";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

const FrameWrapper = dynamic(
  () => import("@/components/FrameWrapper").then((mod) => mod.FrameWrapper),
  {
    loading: () => <Loading />,
  }
);

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
        <Suspense fallback={<Loading />}>
          <FrameWrapper
            title1={lichData?.section1?.title}
            list1={labelList}
            label="Đăng ký tư vấn"
          />
        </Suspense>
      )}

      {isLoading && <Loading height="10vh" />}
    </LayoutNganh>
  );
};
