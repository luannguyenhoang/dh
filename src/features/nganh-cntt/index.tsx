export const revalidate = 5;

import { GET_CONG_NGHE_THONG_TIN } from "@/app/api/GraphQl/congNgheThongTin";
import { Branch } from "@/components/Branch";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { defaultDataCntt } from "../../ultil/DefaultData/defaultDataCntt";

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
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[0]?.cot?.text2 || defaultDataCntt.credits.toString()
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[1]?.cot?.text2 || defaultDataCntt.subjects.toString()
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe: cnttData?.tuyenSinh?.header?.title || defaultDataCntt.notifyData.tieuDe,
    noiDung:
      cnttData?.tuyenSinh?.header?.text ||
      defaultDataCntt.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child: cnttData?.tuyenSinh?.label1?.child || defaultDataCntt.notifyData.tuyenSinh.label1.child,
      },
      label2: {
        image: cnttData?.tuyenSinh?.label2?.image || defaultDataCntt.notifyData.tuyenSinh.label2.image,
      },
    },
  };

  return (
    <LayoutNganh
      title={cnttData?.tieuDe || defaultDataCntt.title}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) || defaultDataCntt.overview
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) || defaultDataCntt.jobs
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
          ) || defaultDataCntt.programList,
        }}
      />
    </LayoutNganh>
  );
};
