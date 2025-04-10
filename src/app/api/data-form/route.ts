import { getClient } from "@/lib/ApolloClient";
import { NextRequest, NextResponse } from "next/server";
import { GET_FORM } from "../GraphQl/form";

export async function GET(req: NextRequest) {
  try {
    // Fetch data using GraphQL query
    const { data } = await getClient().query({ query: GET_FORM });

    if (!data?.allForm?.nodes?.length) {
      return NextResponse.json(
        { error: "No forms available" },
        { status: 404 }
      );
    }

    const htmlString = data.allForm.nodes[0]?.customeForm?.form || "";

    // Regular expressions for extracting form data
    const getFormRegex = /GetForm\("([^"]+)", "([^"]+)"\)/;
    const divRegex = /<div id="([^"]+)" class="([^"]+)"/;

    const getFormMatch = htmlString.match(getFormRegex);
    const divMatch = htmlString.match(divRegex);

    // Extract values or set empty if not found
    const url = getFormMatch?.[1] || "";
    const uuid = getFormMatch?.[2] || "";
    const divId = divMatch?.[1] || "";
    const divClass = divMatch?.[2] || "";

    return NextResponse.json({ url, uuid, divId, divClass }, { status: 200 });
  } catch (error) {
    console.error("Error fetching form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
