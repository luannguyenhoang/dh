"use client";

import { Loading } from "@/components/Loading";
import dynamic from "next/dynamic";

const About = dynamic(
  () => import("@/features/about").then((mod) => mod.About),
  {
    loading: () => <Loading />,
  }
);

const Page = () => {
  return (
    <>
      <About />
    </>
  );
};

export default Page;
