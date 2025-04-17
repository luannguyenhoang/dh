import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { Kt } from "@/features/nganh-kt";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Kt />
    </Suspense>
  );
};

export default Page;
