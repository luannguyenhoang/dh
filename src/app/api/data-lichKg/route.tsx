import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const api_url = process.env.API_URL || "";
  let filteredLines: string[] = [];
  try {
    const responeWordpress = await fetch(
      `${api_url}/posts/?slug=lich-khai-giang`,
      {
        next: { revalidate: 10 },
      }
    );
    const data: any[] = await responeWordpress.json();

    //lấy ra chuỗi formHTML
    const htmlString = data?.length > 0 ? data[0]?.content?.rendered : ``;

    // Loại bỏ các thẻ HTML từ chuỗi
    const textContent = htmlString.replace(/(&#8211;|<[^>]*>)/g, "");

    // Tách các chuỗi bằng dấu xuống dòng
    const lines = textContent.split("\n");

    // Loại bỏ các chuỗi trống và khoảng trắng
    filteredLines = lines?.filter((line: string) => line.trim() !== "");
    filteredLines = filteredLines?.map((line: string) => line?.trim());
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ list: filteredLines });
}
