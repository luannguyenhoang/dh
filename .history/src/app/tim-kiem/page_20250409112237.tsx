import { Search } from "@/features/search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức và thông báo tuyển sinh - Học viện Công nghệ Bưu chính Viễn thông",
  description: "Tìm kiếm bài viết, tin tức, thông báo",
};

export default function SearchPage() {
  return <Search />;
} 