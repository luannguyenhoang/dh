export const revalidate = 5;

import { GET_DIEN_TU_VIEN_THONG } from "@/app/api/GraphQl/DienTuVienThong";
import { Branch } from "@/components/Branch";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const getDtvtData = async () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query: GET_DIEN_TU_VIEN_THONG,
      fetchPolicy: "network-only",
    });

    return response?.data?.allINTViNThNg?.nodes?.[0]?.dienTuVienThong || {};
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {};
  }
};

export const Dtvt = async () => {
  const dtvtData = await getDtvtData();
  const nganhHoc = dtvtData?.nganhHocDtvt || {};

  const credits = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[0]?.cot?.text2 || "124"
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[1]?.cot?.text2 || "42"
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe: dtvtData?.tuyenSinh?.header?.title || "Thông báo tuyển sinh",
    noiDung:
      dtvtData?.tuyenSinh?.header?.text ||
      "Thông báo tuyển sinh hệ từ xa Đại học Thái Nguyên 2023",
    tuyenSinh: {
      label1: {
        child: dtvtData?.tuyenSinh?.label1?.child || [],
      },
      label2: {
        image: dtvtData?.tuyenSinh?.label2?.image || {
          node: { mediaItemUrl: "/phoi-bang-dh-thai-nguyen.jpg" },
        },
      },
    },
  };

  return (
    console.log();
    
    <LayoutNganh
      title={dtvtData?.tieuDe || "Ngành điện tử viễn thông"}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) || []
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) || []
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
              title: "Đã có bằng cao đẳng ngành Điện tử viễn thông",
              content: "Từ 2 năm",
            },
            {
              title: "Đã có bằng cao đẳng khác ngành Điện tử viễn thông",
              content: "Từ 2 - 3 năm",
            },
            {
              title: "Đã có bằng trung cấp ngành Điện tử viễn thông",
              content: "Từ 3 năm",
            },
            {
              title: "Đã có bằng trung cấp khác ngành Điện tử viễn thông",
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
