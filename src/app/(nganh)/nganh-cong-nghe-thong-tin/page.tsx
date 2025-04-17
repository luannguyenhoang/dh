import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { Cntt } from "@/features/nganh-cntt";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Cntt />
    </Suspense>
  );
};

export default Page;
