export const revalidate = 3600;

import { GET_NGON_NGU_ANH } from "@/app/api/GraphQl/ngonNguAnh";
import { FrameWrapper } from "@/components/FrameWrapper";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { defaultDataNna } from "../../ultil/DefaultData/defaultDataNna";

// Tạo singleton Apollo client
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-first',
    },
  },
});

const getNnaData = async () => {
  try {
    const response = await client.query({
      query: GET_NGON_NGU_ANH,
      fetchPolicy: 'cache-first', // Sử dụng cache khi có sẵn
    });

    if (!response?.data) {
      throw new Error(`GraphQL query failed with status: ${response?.networkStatus}`);
    }

    return response?.data?.allNgNNgAnh?.nodes?.[0]?.nganhNgonNguAnh || {};
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {};
  }
};

export const Nna = async () => {
  const nnaData = await getNnaData();
  const ngonNguAnh = nnaData?.ngonNguAnh || {};

  const list1 = ngonNguAnh?.list1?.content?.map((item: any) => item.text) || defaultDataNna.tongQuan.list;

  const list2 = ngonNguAnh?.list2?.content?.map((item: any) => item.text) || defaultDataNna.ngheNghiep.list;

  const notifyData = {
    tieuDe: nnaData?.tuyenSinh?.header?.title || defaultDataNna.notifyData.tieuDe,
    noiDung:
      nnaData?.tuyenSinh?.header?.text ||
      defaultDataNna.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child: nnaData?.tuyenSinh?.label1?.child || defaultDataNna.notifyData.tuyenSinh.label1.child,
      },
      label2: {
        image: nnaData?.tuyenSinh?.label2?.image || defaultDataNna.notifyData.tuyenSinh.label2.image,
      },
    },
  };

  return (
    <LayoutNganh 
      title={nnaData?.tieuDe || defaultDataNna.title}
      data={notifyData}
    >
      <FrameWrapper
        title1={ngonNguAnh?.list1?.title || defaultDataNna.tongQuan.title}
        list1={list1}
        title2={ngonNguAnh?.list2?.title || defaultDataNna.ngheNghiep.title}
        list2={list2}
        label="Đăng ký tư vấn"
      />
    </LayoutNganh>
  );
};
