export const revalidate = 5;

import { GET_LUAT_KING_TE } from "@/app/api/GraphQl/luatKingTe";
import { Branch } from "@/components/Branch";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { defaultDataLkt } from "../../ultil/DefaultData/defaultDataLkt";

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
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label1?.cot?.text2 || defaultDataLkt.credits.toString()
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label2?.cot?.text2 || defaultDataLkt.subjects.toString()
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe: lktData?.tuyenSinh?.header?.title || defaultDataLkt.notifyData.tieuDe,
    noiDung:
      lktData?.tuyenSinh?.header?.text ||
      defaultDataLkt.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child: lktData?.tuyenSinh?.label1?.child || defaultDataLkt.notifyData.tuyenSinh.label1.child,
      },
      label2: {
        image: lktData?.tuyenSinh?.label2?.image || defaultDataLkt.notifyData.tuyenSinh.label2.image,
      },
    },
  };

  return (
    <LayoutNganh
      title={lktData?.tieuDe || defaultDataLkt.title}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title || defaultDataLkt.name}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) || defaultDataLkt.overview
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) || defaultDataLkt.jobs
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
          ) || defaultDataLkt.programList,
        }}
      />
    </LayoutNganh>
  );
};
