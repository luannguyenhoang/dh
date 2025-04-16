export const revalidate = 5;

import { GET_KE_TOAN } from "@/app/api/GraphQl/keToan";
import { Loading } from "@/components/Loading";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { defaultDataKt } from "../../ultil/DefaultData/defaultDataKt";

const Branch = dynamic(
  () => import("@/components/Branch").then((mod) => mod.Branch),
  {
    loading: () => <Loading />,
  }
);

const getKtData = async () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query: GET_KE_TOAN,
      fetchPolicy: "network-only",
    });

    return response?.data?.allKToN?.nodes?.[0]?.keToan || {};
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {};
  }
};

export const Kt = async () => {
  const ktData = await getKtData();
  const nganhKeToan = ktData?.nganhKeToan || {};

  const credits = parseInt(
    nganhKeToan?.chuongTrinhVaThoiGianDaoTao?.label1?.text2 ||
      defaultDataKt.credits.toString()
  );
  const subjects = parseInt(
    nganhKeToan?.chuongTrinhVaThoiGianDaoTao?.label2?.text2 ||
      defaultDataKt.subjects.toString()
  );

  const universityInfo = nganhKeToan?.label || [];

  const notifyData = {
    tieuDe: ktData?.tuyenSinh?.header?.title || defaultDataKt.notifyData.tieuDe,
    noiDung:
      ktData?.tuyenSinh?.header?.text || defaultDataKt.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child:
          ktData?.tuyenSinh?.label1?.child ||
          defaultDataKt.notifyData.tuyenSinh.label1.child,
      },
      label2: {
        image:
          ktData?.tuyenSinh?.label2?.image ||
          defaultDataKt.notifyData.tuyenSinh.label2.image,
      },
    },
  };

  return (
    <LayoutNganh
      title={ktData?.tieuDe || defaultDataKt.title}
      data={notifyData}
    >
      <Suspense fallback={<Loading />}>
        <Branch
          name={nganhKeToan?.title || "Kế toán"}
          universityInfo={universityInfo}
          overview={
            nganhKeToan?.tongQuan?.label?.map((item: any) => item.text) ||
            defaultDataKt.overview
          }
          jobs={
            nganhKeToan?.ngheNghiep?.label?.map((item: any) => item.text) ||
            defaultDataKt.jobs
          }
          program={{
            credits,
            subjects,
            tongQuan: nganhKeToan?.tongQuan,
            ngheNghiep: nganhKeToan?.ngheNghiep,
            chuongTrinhVaThoiGianDaoTao:
              nganhKeToan?.chuongTrinhVaThoiGianDaoTao,
            list:
              nganhKeToan?.chuongTrinhVaThoiGianDaoTao?.label2?.map(
                (item: any) => ({
                  title: item.text1 || "",
                  content: item.text2 || "",
                })
              ) || defaultDataKt.programList,
          }}
        />
      </Suspense>
    </LayoutNganh>
  );
};
