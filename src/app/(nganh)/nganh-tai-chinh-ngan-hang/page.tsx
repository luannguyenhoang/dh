"use client";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { Tcnh } from "@/features/nganh-tcnh";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Tcnh />
    </Suspense>
  );
};

export default Page;
