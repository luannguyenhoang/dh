"use client";

import { CardCat } from "@/components/CardCat";
import { HeadSection } from "@/components/HeadSection";
import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Custom function to create slugs without Vietnamese accents
const createSlug = (text: string): string => {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]/g, "-") // Replace special chars with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
};

export const categotys = [
  {
    image: "/cong-nghe-thong-tin.png",
    path: "/nganh-cong-nghe-thong-tin",
    title: "Ngành công nghệ thông tin",
    desc: "Học ngành Công nghệ thông tin sinh viên có thể nghiên cứu chuyên sâu về Khoa học máy tính, Công nghệ phần mềm, Kỹ thuật máy tính, Hệ thống thông tin, Mạng máy tính và truyền thông, An toàn thông tin mạng",
  },
  {
    image: "/dien-tu-vien-thong.png",
    path: "/nganh-dien-tu-vien-thong",
    title: "Ngành điện tử viễn thông",
    desc: "Ngành điện tử viễn thông là ngành sử dụng những công nghệ tiên tiến, những công nghệ hiện đại của thời địa 4.0 những công nghệ này giúp ích rất nhiều trong hoạt động của con người,",
  },
  {
    image: "/quan-tri-kinh-doanh.png",
    path: "/nganh-quan-tri-kinh-doanh",
    title: "Ngành quản trị kinh doanh",
    desc: "Ngành Quản trị kinh doanh chuẩn bị cho người học những năng lực cần thiết cho việc quản lý các loại hình tổ chức khác nhau, từ các doanh nghiệp cho đến các đơn vị thuộc khu vực",
  },
  {
    image: "/luat-kinh-te.png",
    path: "nganh-luat-kinh-te",
    title: "Ngành Luật kinh tế",
    desc: "Chương trình đào tạo trực tuyến ngành Luật Kinh tế cung cấp cho sinh viên kiến thức chuyên môn và năng lực nghề nghiệp về ngành luật",
  },
  {
    image: "/thuong-mai-dien-tu.png",
    path: "nganh-thuong-mai-dien-tu",
    title: "Ngành thương mại điện tử ",
    desc: "Ngành thương mại điện tử là ngành đào tạo nhân lực có kiến thức, kỹ năng, kinh nghiệm để triển khai các mô hình kinh doanh trực tuyến trên internet",
  },
  {
    image: "/ngon-ngu-anh.png",
    path: "nganh-ngon-ngu-anh",
    title: "Ngành ngôn ngữ Anh",
    desc: " Tiếng Anh là một trong những ngôn ngữ phổ biến nhất và được sử dụng rộng rãi nhất trên thế giới. Tiếng Anh thuộc hệ thống ngôn ngữ Germanic và được viết bằng bảng chữ cái Latin",
  },
  {
    image: "/ngon-ngu-trung.png",
    path: "nganh-ngon-ngu-trung",
    title: "Ngành ngôn ngữ Trung",
    desc: "Ngôn ngữ Trung Quốc là ngành học nghiên cứu và sử dụng tiếng Trung trên nhiều lĩnh vực khác nhau như kinh tế, thương mại, du lịch, ngoại giao",
  },
  {
    image: "/ke-toan.png",
    path: "nganh-ke-toan",
    title: "Ngành kế toán",
    desc: "Kế toán là công việc thu thập và xử lý dữ liệu kinh doanh, tài chính của tổ chức để cung cấp thông tin cho việc ra quyết định quản lý",
  },
  {
    image: "/tai-chinh-ngan-hang.png",
    path: "nganh-tai-chinh-ngan-hang",
    title: "Ngành tài chính ngân hàng",
    desc: "Tài chính ngân hàng là một ngành học khá là rộng, liên quan đến tất cả các dịch vụ giao dịch tài chính Ngân hàng, lưu thông và vận hành tiền tệ. Ngành Tài chính ngân hàng có thể chia thành nhiều lĩnh vực chuyên ngành khác nhau như ngân hàng, tài chính doanh nghiệp, tài chính thuế, tài chính bảo hiểm",
  },
];

export const Categorys = ({ categoryData }: { categoryData?: any }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [processedCategories, setProcessedCategories] = useState<any[]>([]);
  
  useEffect(() => {
    try {
      // Use either API data or fallback to default data
      const sourceData = categoryData?.item || categotys;
      
      // Process the data safely
      if (Array.isArray(sourceData) && sourceData.length > 0) {
        const processed = sourceData.map((item: any) => {
          try {
            // Handle data from API
            if (item.list) {
              const category = item.list;
              if (!category) return null;
              
              let slug = "";
              if (category.tenNganh) {
                slug = "nganh-" + createSlug(category.tenNganh.replace(/^Ngành\s+/i, ""));
              }
              
              return {
                key: Math.random().toString(36).substr(2, 9),
                desc: category.gioiThieu || "",
                path: `/${slug}`,
                title: category.tenNganh || "",
                image: (category.anhNganh?.node?.mediaItemUrl) || "/default-image.jpg"
              };
            } 
            // Handle hardcoded data
            else {
              let slug = "";
              if (item.title) {
                slug = "nganh-" + createSlug(item.title.replace(/^Ngành\s+/i, ""));
              }
              
              return {
                key: Math.random().toString(36).substr(2, 9),
                desc: item.desc || "",
                path: `/${slug}`,
                title: item.title || "",
                image: item.image || "/default-image.jpg"
              };
            }
          } catch (err) {
            console.error("Error processing category item:", err);
            return null;
          }
        }).filter(Boolean); // Remove any null items
        
        setProcessedCategories(processed);
      }
    } catch (error) {
      console.error("Error processing categories:", error);
    } finally {
      setIsLoading(false);
    }
  }, [categoryData]);

  const title = categoryData?.tieuDe || "Chuyên ngành đào tạo";
  const desc =
    categoryData?.noiDung ||
    "Đào tạo đa ngành, chương trình học tiết kiệm thời gian";

  return (
    <Box py={"48px"}>
      <Container maxW="6xl">
        <HeadSection title={title} subtitle="chuyên ngành" desc={desc} />
        
        {isLoading ? (
          <Text textAlign="center" py={8}>Đang tải dữ liệu...</Text>
        ) : processedCategories.length === 0 ? (
          <Text textAlign="center" py={8}>Không có dữ liệu chuyên ngành</Text>
        ) : (
          <SimpleGrid spacing={"8"} columns={{ base: 1, md: 2, lg: 3 }}>
            {processedCategories.map((item) => (
              <CardCat
                key={item.key}
                desc={item.desc}
                path={item.path}
                title={item.title}
                image={item.image}
              />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};
