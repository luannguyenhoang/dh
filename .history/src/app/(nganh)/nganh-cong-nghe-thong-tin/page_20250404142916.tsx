
import { Loading } from "@/components/Loading";
import dynamic from "next/dynamic";

const Cntt = dynamic(
  () => import("@/features/nganh-cntt").then((mod) => mod.Cntt),
  {
    loading: () => <Loading />,
  }
);

const Page = () => {
  return (
    <>
      <Cntt />
    </>
  );
};

export default Page;
