"use client";

import { Loading } from "@/components/Loading";
import dynamic from "next/dynamic";

const Lienhe = dynamic(
  () => import("@/features/lien-he").then((mod) => mod.Dangky),
  {
    loading: () => <Loading />,
  }
);

const Page = () => {
  return (
    <>
      <Lienhe />
    </>
  );
};

export default Page;
