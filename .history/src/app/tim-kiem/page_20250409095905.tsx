import { Search } from "@/features/search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tìm kiếm | EDUBROC",
  description: "Tìm kiếm bài viết, tin tức, thông báo",
};

export default function SearchPage() {
  return <Search />;
} 