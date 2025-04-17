import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { Nnt } from "@/features/nganh-nnt";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Nnt />
    </Suspense>
  );
};

export default Page;
