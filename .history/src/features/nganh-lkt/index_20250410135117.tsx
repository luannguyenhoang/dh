export const revalidate = 5;

import { GET_LUAT_KING_TE } from "@/app/api/GraphQl/luatKingTe";
import { Branch } from "@/components/Branch";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const getLktData = async () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query: GET_LUAT_KING_TE,
      fetchPolicy: "network-only",
    });

    return response?.data?.allLuTKinhT?.nodes?.[0]?.luatKinhTe || {};
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {};
  }
};

export const Lkt = async () => {
  const lktData = await getLktData();
  const nganhHoc = lktData?.nganhHocCntt || {};

  const credits = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label1?.cot?.text2 || "124"
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label2?.cot?.text2 || "42"
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe: lktData?.tuyenSinh?.header?.title || "Thông báo tuyển sinh",
    noiDung:
      lktData?.tuyenSinh?.header?.text ||
      "Thông báo tuyển sinh hệ từ xa Đại học Thái Nguyên 2023",
    tuyenSinh: {
      label1: {
        child: lktData?.tuyenSinh?.label1?.child || [],
      },
      label2: {
        image: lktData?.tuyenSinh?.label2?.image,
      },
    },
  };

  return (
    <LayoutNganh
      title={lktData?.tieuDe || "Ngành luật kế toán"}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title || "Luật kế toán"}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) || [
            "Chương trình đào tạo trực tuyến ngành Luật Kinh tế cung cấp cho sinh viên kiến thức chuyên môn và năng lực nghề nghiệp về ngành luật, đồng thời chuyên sâu hơn trong lĩnh vực luật kinh doanh thương mại để giải quyết các vấn đề pháp lý trong công việc và cuộc sống. Sinh viên cũng được trang bị kiến thức bổ trợ về kinh tế, quản trị, kế toán để phục vụ cho nghề nghiệp. Bên cạnh đó, sinh viên được rèn luyện các kỹ năng áp dụng pháp luật, thực hành nghề nghiệp, tư duy phản biện và được bồi dưỡng hình thành thái độ văn hóa ứng xử pháp lý và tuân thủ pháp luật.",
          ]
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) || [
            "Luật sư",
            "Nhân viên văn phòng công chứng",
            "Chấp hành viên",
            "Thẩm tra viên",
            "Chuyên viên tư vấn pháp luật tại các doanh nghiệp",
            "Chuyên viên nghiên cứu hành pháp, lập pháp và tư pháp tại các cơ quan nhà nước",
            "Giảng viên Luật kinh tế",
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
              title: item.cot.text1 || "",
              content: item.cot.text2 || "",
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
