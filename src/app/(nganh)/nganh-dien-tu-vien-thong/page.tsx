import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { Dtvt } from "@/features/nganh-dtvt";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Dtvt />
    </Suspense>
  );
};

export default Page;
