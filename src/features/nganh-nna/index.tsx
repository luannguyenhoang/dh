export const revalidate = 5;

import { GET_NGON_NGU_ANH } from "@/app/api/GraphQl/ngonNguAnh";
import { FrameWrapper } from "@/components/FrameWrapper";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const getNnaData = async () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query: GET_NGON_NGU_ANH,
      fetchPolicy: "network-only",
    });

    return response?.data?.allNgNNgAnh?.nodes?.[0]?.nganhNgonNguAnh || {};
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {};
  }
};

export const Nna = async () => {
  const nnaData = await getNnaData();
  const ngonNguAnh = nnaData?.ngonNguAnh || {};

  const list1 = ngonNguAnh?.list1?.content?.map((item: any) => item.text) || [
    "Tiếng Anh là ngôn ngữ chính thức của Vương quốc Anh, Hoa Kỳ, Canada, Úc, và nhiều quốc gia và vùng lãnh thổ khác trên khắp thế giới. Nó là một trong những ngôn ngữ phổ biến nhất và được sử dụng rộng rãi nhất trên thế giới. Tiếng Anh thuộc hệ thống ngôn ngữ Germanic và được viết bằng bảng chữ cái Latin",
    "Tiếng Anh được sử dụng rộng rãi trong nhiều lĩnh vực, bao gồm kinh doanh, khoa học, công nghệ, giáo dục, truyền thông, và văn hóa đại chúng. Nó là ngôn ngữ chính thức của nhiều tổ chức quốc tế như Liên Hợp Quốc và NATO.",
  ];

  const list2 = ngonNguAnh?.list2?.content?.map((item: any) => item.text) || [
    "Giảng viên tiếng anh",
    "Dịch thuật và phiên dịch",
    "Kinh doanh quốc tế",
    "Nghiên cứu và phát triển",
    "Hướng dẫn viên, chuyên viên tư vấn tại các công ty du lịch, lữ hành, nhà hàng khách sạn",
  ];

  const notifyData = {
    tieuDe: nnaData?.tuyenSinh?.header?.title || "Thông báo tuyển sinh",
    noiDung:
      nnaData?.tuyenSinh?.header?.text ||
      "Thông báo tuyển sinh hệ từ xa Đại học Thái Nguyên 2023",
    tuyenSinh: {
      label1: {
        child: nnaData?.tuyenSinh?.label1?.child || [],
      },
      label2: {
        image: nnaData?.tuyenSinh?.label2?.image?.node?.mediaItemUrl || "",
      },
    },
  };

  return (
    <LayoutNganh 
      title={nnaData?.tieuDe || "Ngành ngôn ngữ Anh"}
      data={notifyData}
    >
      <FrameWrapper
        title1={ngonNguAnh?.list1?.title || "Tổng quan chương trình"}
        list1={list1}
        title2={ngonNguAnh?.list2?.title || "Nghề nghiệp"}
        list2={list2}
        label="Đăng ký tư vấn"
      />
    </LayoutNganh>
  );
};
