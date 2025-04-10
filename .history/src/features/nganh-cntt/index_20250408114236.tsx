export const revalidate = 5;

import { GET_CONG_NGHE_THONG_TIN } from "@/app/api/GraphQl/congNgheThongTin";
import { Branch } from "@/components/Branch";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const getCnttData = async () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query: GET_CONG_NGHE_THONG_TIN,
      fetchPolicy: "network-only",
    });

    return response?.data?.allCNgNghThNgTin?.nodes?.[0]?.cNgNghThNgTin || {};
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {};
  }
};

export const Cntt = async () => {
  const cnttData = await getCnttData();
  const nganhHoc = cnttData?.nganhHocCntt || {};

  const credits = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[0]?.cot?.text2 || "124"
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[1]?.cot?.text2 || "42"
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe: cnttData?.tuyenSinh?.header?.title || "Thông báo tuyển sinh",
    noiDung:
      cnttData?.tuyenSinh?.header?.text ||
      "Thông báo tuyển sinh hệ từ xa Đại học Thái Nguyên 2023",
    tuyenSinh: {
      label1: {
        child: [],
      },
      label2: {
        image: {
          node: { mediaItemUrl: "/phoi-bang-dh-thai-nguyen.jpg" },
        },
      },
    },
  };

  return (
    <LayoutNganh
      title={cnttData?.tieuDe || "Ngành công nghệ thông tin"}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) || [
            "Công nghệ thông tin là ngành sử dụng máy tính và phần mềm máy tính để chuyển đổi, lưu trữ, bảo vệ, xử lý, truyền và thu thập thông tin. Người làm việc trong trong ngành này thường được gọi là IT (Information Technology). Mục đích của khối khoa học tổng hợp liên ngành này là nhằm phát triển khả năng sửa chữa, tạo mới và sử dụng hệ thống các thiết bị và máy tính bao gồm phần cứng, phần mềm để cung cấp giải pháp xử lý thông tin trên nền công nghệ cá nhân, tổ chức có yêu cầu.",
            "Học ngành Công nghệ thông tin sinh viên có thể nghiên cứu chuyên sâu về Khoa học máy tính, Công nghệ phần mềm, Kỹ thuật máy tính, Hệ thống thông tin, Mạng máy tính và truyền thông, An toàn thông tin mạng. Phần kiến thức chuyên ngành sẽ trang bị cho sinh viên những kiến thức liên quan đến việc nghiên cứu phát triển, gia công hay ứng dụng hệ thống phần mềm; kiến thức về thiết kế, xây dựng, cài đặt, vận hành và bảo trì các thành phần phần cứng, phần mềm của hệ thống máy tính và các hệ thống thiết bị dựa trên máy tính; kiến thức về mạng máy tính và truyền thông.",
          ]
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) || [
            "Trở thành lập trình viên phần mềm: người trực tiếp tạo ra các sản phẩm phần mềm",
            "Kiểm duyệt chất lượng phần mềm: trực tiếp kiểm tra chất lượng các sản phẩm do lập trình viên tạo ra",
            "Chuyên viên phân tích thiết kế hệ thống, quản lý dữ liệu, quản trị mạng, kỹ thuật phần cứng  máy tính,",
            "Chuyên gia quản lý, điều phối các dự án công nghệ thông tin…",
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
              title: "Đã có bằng cao đẳng ngành Công nghệ thông tin",
              content: "Từ 2 năm",
            },
            {
              title: "Đã có bằng cao đẳng khác ngành Công nghệ thông tin",
              content: "Từ 2 - 3 năm",
            },
            {
              title: "Đã có bằng trung cấp ngành Công nghệ thông tin",
              content: "Từ 3 năm",
            },
            {
              title: "Đã có bằng trung cấp khác ngành Công nghệ thông tin",
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
