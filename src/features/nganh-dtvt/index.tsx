export const revalidate = 5;

import { GET_DIEN_TU_VIEN_THONG } from "@/app/api/GraphQl/dienTuVienThong";
import { Branch } from "@/components/Branch";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { defaultDataDtvt } from "../../DefaultData/defaultDataDtvt";

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
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[0]?.cot?.text2 || defaultDataDtvt.credits.toString()
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[1]?.cot?.text2 || defaultDataDtvt.subjects.toString()
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe: dtvtData?.tuyenSinh?.header?.title || defaultDataDtvt.notifyData.tieuDe,
    noiDung:
      dtvtData?.tuyenSinh?.header?.text ||
      defaultDataDtvt.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child: dtvtData?.tuyenSinh?.label1?.child || defaultDataDtvt.notifyData.tuyenSinh.label1.child,
      },
      label2: {
        image: dtvtData?.tuyenSinh?.label2?.image || defaultDataDtvt.notifyData.tuyenSinh.label2.image,
      },
    },
  };

  return (
    <LayoutNganh
      title={dtvtData?.tieuDe || defaultDataDtvt.title}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) || defaultDataDtvt.overview
        }
        jobs={nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) || defaultDataDtvt.jobs}
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
          ) || defaultDataDtvt.programList,
        }}
      />
    </LayoutNganh>
  );
};
