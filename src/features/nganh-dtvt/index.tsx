export const revalidate = 3600;

import { GET_DIEN_TU_VIEN_THONG } from "@/app/api/GraphQl/dienTuVienThong";
import { Loading } from "@/components/Loading";
import { Branch } from "@/components/Branch";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Suspense } from "react";
import { defaultDataDtvt } from "../../ultil/DefaultData/defaultDataDtvt";

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

const getDtvtData = async () => {
  try {
    const response = await client.query({
      query: GET_DIEN_TU_VIEN_THONG,
      fetchPolicy: 'cache-first', // Sử dụng cache khi có sẵn
    });

    if (!response?.data) {
      throw new Error(`GraphQL query failed with status: ${response?.networkStatus}`);
    }

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
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[0]?.cot?.text2 ||
      defaultDataDtvt.credits.toString()
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[1]?.cot?.text2 ||
      defaultDataDtvt.subjects.toString()
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe:
      dtvtData?.tuyenSinh?.header?.title || defaultDataDtvt.notifyData.tieuDe,
    noiDung:
      dtvtData?.tuyenSinh?.header?.text || defaultDataDtvt.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child:
          dtvtData?.tuyenSinh?.label1?.child ||
          defaultDataDtvt.notifyData.tuyenSinh.label1.child,
      },
      label2: {
        image:
          dtvtData?.tuyenSinh?.label2?.image ||
          defaultDataDtvt.notifyData.tuyenSinh.label2.image,
      },
    },
  };

  return (
    <LayoutNganh
      title={dtvtData?.tieuDe || defaultDataDtvt.title}
      data={notifyData}
    >
      <Suspense fallback={<Loading />}>
        <Branch
          name={nganhHoc?.title}
          universityInfo={universityInfo}
          overview={
            nganhHoc?.tongQuan?.label?.map((item: any) => item.text) ||
            defaultDataDtvt.overview
          }
          jobs={
            nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) ||
            defaultDataDtvt.jobs
          }
          program={{
            credits,
            subjects,
            tongQuan: nganhHoc?.tongQuan,
            ngheNghiep: nganhHoc?.ngheNghiep,
            chuongTrinhVaThoiGianDaoTao: nganhHoc?.chuongTrinhVaThoiGianDaoTao,
            list:
              nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label2?.map(
                (item: any) => ({
                  title: item.text1 || "",
                  content: item.text2 || "",
                })
              ) || defaultDataDtvt.programList,
          }}
        />
      </Suspense>
    </LayoutNganh>
  );
};
