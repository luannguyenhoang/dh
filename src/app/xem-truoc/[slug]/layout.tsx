import { LayoutPost } from "@/layouts/layoutPost";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <LayoutPost>{children}</LayoutPost>
    </div>
  );
};

export default Layout;
