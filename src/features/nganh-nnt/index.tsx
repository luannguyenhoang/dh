export const revalidate = 5;

import { GET_NGON_NGU_TRUNG } from "@/app/api/GraphQl/ngonNguTrung";
import { FrameWrapper } from "@/components/FrameWrapper";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { defaultDataNnt } from "../../ultil/DefaultData/defaultDataNnt";

const getNntData = async () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query: GET_NGON_NGU_TRUNG,
      fetchPolicy: "network-only",
    });

    return response?.data?.allNgNNgTrung?.nodes?.[0]?.nganhNgonNguTrung || {};
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {};
  }
};

export const Nnt = async () => {
  const nntData = await getNntData();
  const ngonNguTrung = nntData?.ngonNguTrung || {};

  const list1 =
    ngonNguTrung?.list1?.content?.map((item: any) => item.text) ||
    defaultDataNnt.tongQuan.list;

  const list2 =
    ngonNguTrung?.list2?.content?.map((item: any) => item.text) ||
    defaultDataNnt.ngheNghiep.list;

  const notifyData = {
    tieuDe:
      nntData?.tuyenSinh?.header?.title || defaultDataNnt.notifyData.tieuDe,
    noiDung:
      nntData?.tuyenSinh?.header?.text || defaultDataNnt.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child:
          nntData?.tuyenSinh?.label1?.child ||
          defaultDataNnt.notifyData.tuyenSinh.label1.child,
      },
      label2: {
        image:
          nntData?.tuyenSinh?.label2?.image ||
          defaultDataNnt.notifyData.tuyenSinh.label2.image,
      },
    },
  };

  return (
    <LayoutNganh
      title={nntData?.tieuDe || defaultDataNnt.title}
      data={notifyData}
    >
      <FrameWrapper
        title1={ngonNguTrung?.list1?.title || defaultDataNnt.tongQuan.title}
        list1={list1}
        title2={ngonNguTrung?.list2?.title || defaultDataNnt.ngheNghiep.title}
        list2={list2}
        label="Đăng ký tư vấn"
      />
    </LayoutNganh>
  );
};
