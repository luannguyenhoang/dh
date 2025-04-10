import { Search } from "@/features/search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức và thông báo tuyển sinh - Học viện Công nghệ Bưu chính Viễn thông",
  description: "Học viện Công nghệ Bưu chính Viễn thông tuyển sinh năm 2023 - tổng hợp các tin tức tuyển sinh mới nhất của Học viện Công nghệ Bưu chính Viễn thông",
};

export default function SearchPage() {
  return <Search />;
} 