"use client";

import { Loading } from "@/components/Loading";
import dynamic from "next/dynamic";

const Dtvt = dynamic(
  () => import("@/features/nganh-dtvt").then((mod) => mod.Dtvt),
  {
    loading: () => <Loading />,
  }
);

const Page = () => {
  return (
    <>
      <Dtvt />
    </>
  );
};

export default Page;
