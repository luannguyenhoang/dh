export const revalidate = 5;

import { GET_THUONG_MAI_DIEN_TU_VA_MARKETING_SO } from "@/app/api/GraphQl/thuongMaiDienTuVaMarketingSo";
import { Branch } from "@/components/Branch";
import { LayoutNganh } from "@/layouts/layoutNganh";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { defaultDataTmdt } from "../../ultil/DefaultData/defaultDataTmdt";

const getTmdtData = async () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query: GET_THUONG_MAI_DIEN_TU_VA_MARKETING_SO,
      fetchPolicy: "network-only",
    });

    return response?.data?.allThNgMIINT?.nodes?.[0]?.thuongMaiDienTu || {};
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {};
  }
};

export const Tmdt = async () => {
  const tmdtData = await getTmdtData();
  const nganhHoc = tmdtData?.nganhHocCntt || {};

  const credits = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label1?.cot?.text2 || defaultDataTmdt.credits.toString()
  );
  const subjects = parseInt(
    nganhHoc?.chuongTrinhVaThoiGianDaoTao?.label2?.cot?.text2 || defaultDataTmdt.subjects.toString()
  );

  const universityInfo = nganhHoc?.label || [];

  const notifyData = {
    tieuDe: tmdtData?.tuyenSinh?.header?.title || defaultDataTmdt.notifyData.tieuDe,
    noiDung:
      tmdtData?.tuyenSinh?.header?.text ||
      defaultDataTmdt.notifyData.noiDung,
    tuyenSinh: {
      label1: {
        child: tmdtData?.tuyenSinh?.label1?.child || defaultDataTmdt.notifyData.tuyenSinh.label1.child,
      },
      label2: {
        image: tmdtData?.tuyenSinh?.label2?.image || defaultDataTmdt.notifyData.tuyenSinh.label2.image,
      },
    },
  };

  return (
    <LayoutNganh
      title={tmdtData?.tieuDe || defaultDataTmdt.title}
      data={notifyData}
    >
      <Branch
        name={nganhHoc?.title || defaultDataTmdt.name}
        universityInfo={universityInfo}
        overview={
          nganhHoc?.tongQuan?.label?.map((item: any) => item.text) || defaultDataTmdt.overview
        }
        jobs={
          nganhHoc?.ngheNghiep?.label?.map((item: any) => item.text) || defaultDataTmdt.jobs
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
          ) || defaultDataTmdt.programList,
        }}
      />
    </LayoutNganh>
  );
};
