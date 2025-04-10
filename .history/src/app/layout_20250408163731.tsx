"server only";

import { CTA } from "@/layouts/components/Cta";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GoogleTagManager } from "@next/third-parties/google";
import dynamic from "next/dynamic";
import { GET_FOOTER } from "./api/GraphQl/footer";
import { GET_CTA } from "./api/GraphQl/home";

const Footer = dynamic(() =>
  import("@/layouts/footer").then((mod) => mod.Footer)
);
const Header = dynamic(() =>
  import("@/layouts/header").then((mod) => mod.Header)
);
const Providers = dynamic(() =>
  import("@/app/provider").then((mod) => mod.Providers)
);

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const { footerData, ctaData } = await getLayoutData();

  return (
    <html lang="vi">
      <head>
        {/*  eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GoogleTagManager gtmId={"GTM-NWZGPMN" as string} />
        {/* <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} /> */}

        <Providers>
          
          <Header />
          {children}
          <Footer footerData={footerData} />
          <CTA ctaData={ctaData} />
        </Providers>
      </body>
    </html>
  );
};

async function getLayoutData() {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  try {
    const [footerResponse, ctaResponse] = await Promise.all([
      client.query({
        query: GET_FOOTER,
        fetchPolicy: "network-only",
      }),
      client.query({
        query: GET_CTA,
        fetchPolicy: "network-only",
      }),
    ]);

    return {
      footerData:
        footerResponse?.data?.allTrangCh?.nodes?.[0]?.trangCh?.footer || {},
      ctaData: ctaResponse?.data?.allCTA?.nodes?.[0]?.ctaQuery || {},
    };
  } catch (error) {
    console.error("GraphQL Error:", error);
    return { footerData: {}, ctaData: {} };
  }
}

export default RootLayout;
