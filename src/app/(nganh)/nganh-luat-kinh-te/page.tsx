import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { Lkt } from "@/features/nganh-lkt";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Lkt />
    </Suspense>
  );
};

export default Page;
