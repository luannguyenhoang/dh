export const revalidate = 20;

import { GET_QUAN_TRI_KINH_DOANH } from "@/app/api/GraphQl/quanTriKinhDoanh";
import { Branch } from "@/components/Branch";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { defaultDataQtkd } from "../../ultil/DefaultData/defaultDataQtkd";

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

const getQtkdData = async () => {
  try {
    const response = await client.query({
      query: GET_QUAN_TRI_KINH_DOANH,
      fetchPolicy: 'cache-first',
    });

    if (!response?.data) {
      throw new Error(`GraphQL query failed with status: ${response?.networkStatus}`);
    }

    return response?.data?.allQuNTrKinhDoanh?.nodes?.[0]?.quNTrKinhDoanh || {};
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {};
  }
};

export const Qtkd = async () => {
  const qtkdData = await getQtkdData();
  const nganhHoc = qtkdData?.nganhHocQtkd || {};

  const credits = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[0]?.text2 || defaultDataQtkd.credits.toString()
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label?.[1]?.text2 || defaultDataQtkd.subjects.toString()
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe: qtkdData?.tuyenSinh?.header?.title || defaultDataQtkd.notifyData.tieuDe,
    noiDung:
      qtkdData?.tuyenSinh?.header?.text ||
      defaultDataQtkd.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child: qtkdData?.tuyenSinh?.label1?.child || defaultDataQtkd.notifyData.tuyenSinh.label1.child,
      },
      label2: {
        image: qtkdData?.tuyenSinh?.label2?.image || defaultDataQtkd.notifyData.tuyenSinh.label2.image,
      },
    },
  };

  return (
    <LayoutNganh
      title={qtkdData?.tieuDe || defaultDataQtkd.title}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) || defaultDataQtkd.overview
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) || defaultDataQtkd.jobs
        }
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
          ) || defaultDataQtkd.programList,
        }}
      />
    </LayoutNganh>
  );
};
