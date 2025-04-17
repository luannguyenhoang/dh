"use client";
import { Loading } from "@/components/Loading";
import { Qtkd } from "@/features/nganh-qtkd";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Qtkd />
    </Suspense>
  );
};

export default Page;
