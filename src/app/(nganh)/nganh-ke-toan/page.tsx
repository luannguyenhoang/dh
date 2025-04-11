import { Loading } from "@/components/Loading";
import dynamic from "next/dynamic";

const Kt = dynamic(() => import("@/features/nganh-kt").then((mod) => mod.Kt), {
  loading: () => <Loading />,
});

const Page = () => {
  return (
    <>
      <Kt />
    </>
  );
};

export default Page;
