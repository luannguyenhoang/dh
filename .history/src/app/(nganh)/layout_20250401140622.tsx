import { Counters } from "@/features/home/Counters";
import { Review } from "@/features/home/Review";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Counters />
      <Review />
    </>
  );
};

export default Layout;
