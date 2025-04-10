import { ApolloClient, DocumentNode, InMemoryCache } from "@apollo/client";

interface SeoData {
  seo: {
    fullHead?: string;
    focusKeywords?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * @param query
 * @param nodeKey
 * @param extraData
 * @returns
 */
export async function getSeoData(
  query: DocumentNode,
  nodeKey: string,
  extraData: string[] = []
): Promise<SeoData> {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  try {
    const response = await client.query({
      query,
      fetchPolicy: "network-only",
    });

    const nodeData = response?.data?.[nodeKey]?.nodes?.[0] || {};

    const result: SeoData = {
      seo: nodeData?.seo || {},
    };

    if (extraData.length > 0) {
      extraData.forEach((key) => {
        if (nodeData[key]) {
          result[key] = nodeData[key];
        }
      });
    }

    return result;
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {
      seo: {},
    };
  }
}
