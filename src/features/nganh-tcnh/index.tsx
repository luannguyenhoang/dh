export const revalidate = 20;

import { GET_TAI_CHINH_NGAN_HANG } from "@/app/api/GraphQl/taiChinhNganHang";
import { Branch } from "@/components/Branch";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { defaultDataTcnh } from "../../ultil/DefaultData/defaultDataTcnh";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
  ssrMode: typeof window === "undefined",
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
});

const getTcnhData = async () => {
  try {
    const response = await client.query({
      query: GET_TAI_CHINH_NGAN_HANG,
      fetchPolicy: "cache-first", 
    });

    if (!response?.data) {
      throw new Error(
        `GraphQL query failed with status: ${response?.networkStatus}`
      );
    }

    return response?.data?.allTIChNhNgNHNg?.nodes?.[0]?.taiChinhNganHang || {};
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {};
  }
};

export const Tcnh = async () => {
  const tcnhData = await getTcnhData();
  const nganhHoc = tcnhData?.nganhHocTcnh || {};

  const credits = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label1?.text2 ||
      defaultDataTcnh.credits.toString()
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label2?.text2 ||
      defaultDataTcnh.subjects.toString()
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe:
      tcnhData?.tuyenSinh?.header?.title || defaultDataTcnh.notifyData.tieuDe,
    noiDung:
      tcnhData?.tuyenSinh?.header?.text || defaultDataTcnh.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child:
          tcnhData?.tuyenSinh?.label1?.child ||
          defaultDataTcnh.notifyData.tuyenSinh.label1.child,
      },
      label2: {
        image:
          tcnhData?.tuyenSinh?.label2?.image ||
          defaultDataTcnh.notifyData.tuyenSinh.label2.image,
      },
    },
  };

  return (
    <LayoutNganh
      title={tcnhData?.tieuDe || defaultDataTcnh.title}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) ||
          defaultDataTcnh.overview
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) ||
          defaultDataTcnh.jobs
        }
        program={{
          credits,
          subjects,
          tongQuan: nganhHoc?.tongQuan,
          ngheNghiep: nganhHoc?.ngheNghiep,
          chuongTrinhVaThoiGianDaoTao: nganhHoc?.chuongTrinhVaThoiGianDaoTao,
          list:
            nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label2?.map((item: any) => ({
              title: item.text1 || "",
              content: item.text2 || "",
            })) || defaultDataTcnh.programList,
        }}
      />
    </LayoutNganh>
  );
};
