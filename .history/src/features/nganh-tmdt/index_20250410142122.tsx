export const revalidate = 5;

import { GET_THUONG_MAI_DIEN_TU_VA_MARKETING_SO } from "@/app/api/GraphQl/thuongMaiDienTuVaMarketingSo";
import { Branch } from "@/components/Branch";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const getTmdtData = async () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query: GET_THUONG_MAI_DIEN_TU_VA_MARKETING_SO,
      fetchPolicy: "network-only",
    });

    return response?.data?.allThNgMIINT?.nodes?.[0]?.thuongMaiDienTu || {};
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {};
  }
};

export const Tmdt = async () => {
  const tmdtData = await getTmdtData();
  const nganhHoc = tmdtData?.nganhHocCntt || {};

  const credits = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label1?.cot?.text2 || "124"
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label2?.cot?.text2 || "42"
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe: tmdtData?.tuyenSinh?.header?.title || "Thông báo tuyển sinh",
    noiDung:
      tmdtData?.tuyenSinh?.header?.text ||
      "Thông báo tuyển sinh hệ từ xa Đại học Thái Nguyên 2023",
    tuyenSinh: {
      label1: {
        child: tmdtData?.tuyenSinh?.label1?.child || [],
      },
      label2: {
        image: tmdtData?.tuyenSinh?.label2?.image?.node?.mediaItemUrl || "",
      },
    },
  };
  console.log("start");
  console.log(notifyData);
  console.log(notifyData);
  return (
    <LayoutNganh
      title={tmdtData?.tieuDe || "Ngành Thương mại điện tử và Marketing số"}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title || "Thương mại điện tử và Marketing số"}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) || [
            `Ngành thương mại điện tử là ngành đào tạo nhân lực có kiến thức, kỹ năng, kinh nghiệm để triển khai các mô hình kinh doanh trực tuyến trên internet. Khi xu hướng mua sắm online tăng thì nhu cầu tuyển dụng nhân sự ngành thương mại điện tử cũng tăng theo và đang ngày càng trở nên "hot" hơn bao giờ hết.`,
            "Tuy là một lĩnh vực còn khá mới tại Việt Nam nhưng thương mại điện tử đang phát triển với tốc độc nhanh và hoà nhập cùng thị trường thương mại điện tử toàn cầu. Vì vậy, trong những năm tới đây, cơ hội việc làm cho những lao động có chuyên môn về thương mại điện tử thật sự rộng mở và nhiều khả năng thăng tiến trong nghề nghiệp.",
            "Chương trình cử nhân trực tuyến Thương mại điện tử sẽ cung cấp các kiến thức nền tảng về kinh tế, xã hội bên cạnh các kiến thức và kỹ năng chuyên sâu về quản trị các lĩnh vực khác nhau, đáp ứng nhu cầu đa dạng của các tổ chức và mục tiêu thăng tiến của cá nhân.",
          ]
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) || [
            "Chuyên viên phát triển và quản trị thương hiệu",
            "Giảng dạy, nghiên cứu về Quản trị Marketing, Marketing",
            "Nhân viên chăm sóc khách hàng, quan hệ công chúng",
            "Chuyên viên tại các công ty hoạt động trong lĩnh vực Marketing",
            "Nhân viên nghiên cứu thị trường",
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
