"use client";

import { Loading } from "@/components/Loading";
import dynamic from "next/dynamic";

const Dangky = dynamic(
  () => import("@/features/dang-ky").then((mod) => mod.Dangky),
  {
    loading: () => <Loading />,
  }
);

const Page = () => {
  return (
    <>
      <Dangky />
    </>
  );
};

export default Page;
