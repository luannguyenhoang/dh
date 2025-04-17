import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { Tmdt } from "@/features/nganh-tmdt";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Tmdt />
    </Suspense>
  );
};

export default Page;