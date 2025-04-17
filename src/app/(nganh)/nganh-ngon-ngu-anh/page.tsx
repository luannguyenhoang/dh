import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { Nna } from "@/features/nganh-nna";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Nna />
    </Suspense>
  );
};

export default Page;
