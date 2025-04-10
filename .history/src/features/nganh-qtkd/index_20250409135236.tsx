export const revalidate = 5;

import { GET_QUAN_TRI_KINH_DOANH } from "@/app/api/GraphQl/quanTriKinhDoanh";
import { Branch } from "@/components/Branch";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const getQtkdData = async () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query: GET_QUAN_TRI_KINH_DOANH,
      fetchPolicy: "network-only",
    });

    return response?.data?.allQuNTrKinhDoanh?.nodes?.[0]?.quNTrKinhDoanh || {};
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {};
  }
};

export const Qtkd = async () => {
  const qtkdData = await getQtkdData();
  const nganhHoc = qtkdData?.nganhHocQtkd || {};

  const credits = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[0]?.text2 || "124"
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[1]?.text2 || "42"
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe: qtkdData?.tuyenSinh?.header?.title || "Thông báo tuyển sinh",
    noiDung:
      qtkdData?.tuyenSinh?.header?.text ||
      "Thông báo tuyển sinh hệ từ xa Đại học Thái Nguyên 2023",
    tuyenSinh: {
      label1: {
        child: qtkdData?.tuyenSinh?.label1?.child || [],
      },
      label2: {
        image: qtkdData?.tuyenSinh?.label2?.image,
      },
    },
  };

  return (
    <LayoutNganh
      title={qtkdData?.tieuDe || "Ngành quản trị kinh doanh"}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) || [
            "Ngành Quản trị kinh doanh chuẩn bị cho người học những năng lực cần thiết cho việc quản lý các loại hình tổ chức khác nhau, từ các doanh nghiệp cho đến các đơn vị thuộc khu vực công nhằm đạt được mục tiêu với hiệu quả cao nhất. Trong các tổ chức nói trên, người học quản trị kinh doanh có thể đáp ứng yêu cầu của những vị trí quản lý khác nhau: nhân sự, marketing, sản xuất hay điều hành chung tùy theo kinh nghiệm, sở thích và nhu cầu của đơn vị",
          ]
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) || [
            "Quản trị kinh doanh quốc tế",
            "Quản trị Marketing",
            "Quản trị kinh doanh tổng hợp",
            "Quản trị doanh nghiệp",
            "Quản trị Khởi nghiệp",
            "Quản trị Logistic",
          ]
        }
        program={{
          credits,
          subjects,
          tongQuan: nganhHoc?.tongQuan,
          ngheNghiep: nganhHoc?.ngheNghiep,
          chuongTrinhVaThoiGianDaoTao: nganhHoc?.chuongTrinhVaThoiGianDaoTao,
          list: nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label2?.map(
            (item: any) => ({
              title: item.text1 || "",
              content: item.text2 || "",
            })
          ) || [
            {
              title: "Đã có bằng Trung học phổ thông",
              content: "Từ 4 năm",
            },
            {
              title: "Đã có bằng cao đẳng ngành Quản trị kinh doanh",
              content: "Từ 2 năm",
            },
            {
              title: "Đã có bằng cao đẳng khác ngành Quản trị kinh doanh",
              content: "Từ 2 - 3 năm",
            },
            {
              title: "Đã có bằng trung cấp ngành Quản trị kinh doanh",
              content: "Từ 3 năm",
            },
            {
              title: "Đã có bằng trung cấp khác ngành Quản trị kinh doanh",
              content: "Từ 4 năm",
            },
            {
              title: "Đã có bằng Đại học",
              content: "Từ 1,5 - 2 năm",
            },
          ],
        }}
      />
    </LayoutNganh>
  );
};
