/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { GET_FORM } from "@/app/api/GraphQl/form";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FormGetFly } from "./FormGetFly";
import { FormGoogle } from "./FormGoogle";
import { FormSam } from "./FormSam";
import { Loading } from "./Loading";

interface FormData {
  type: "form-getfly" | "form-sam" | "form-google" | "unknown";
  url: string;
  uuid: string;
  divId: string;
  divClass: string;
}

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_GRAPHQL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

export const FormWrapper = ({
  title,
  color,
  type = "form-main",
}: {
  title?: string;
  color?: string;
  type?: "form-main" | "form-poup";
}) => {
  const [processedFormData, setProcessedFormData] = useState<FormData>({
    type: "unknown",
    url: "",
    uuid: "",
    divId: "",
    divClass: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parseFormHtml = (htmlString: string): FormData => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    let formType: "form-getfly" | "form-sam" | "form-google" | "unknown" =
      "unknown";
    let url = "";
    let uuid = "";
    let divId = "";
    let divClass = "";

    if (htmlString.includes("sambala.net/formio")) {
      formType = "form-sam";

      const container = doc.querySelector(".formio_form_iframe_container");
      if (container) {
        divId = container.id;
        divClass = container.className;
      }

      const uuidMatch = divId.match(
        /formio_form_iframe_container_([a-zA-Z0-9-]+)/
      );
      if (uuidMatch && uuidMatch[1]) {
        uuid = uuidMatch[1];
      }

      const scriptTags = doc.querySelectorAll("script");
      scriptTags.forEach((script) => {
        const content = script.textContent || "";
        const urlMatch = content.match(/GetForm\("([^"]+)"/);
        if (urlMatch && urlMatch[1]) {
          url = urlMatch[1];
        }
      });
    }

    return {
      type: formType,
      url,
      uuid,
      divId,
      divClass,
    };
  };

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await client.query({
          query: GET_FORM,
        });

        const formData = response.data.allForm?.nodes?.[0]?.formQuery;

        const htmlContent =
          type === "form-main" ? formData.formMain : formData.formPoup;

        const parsedData = parseFormHtml(htmlContent);

        setProcessedFormData(parsedData);
        setError(null);
      } catch (err) {
        console.error("Error processing form data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [type]);

  if (loading) {
    return <Loading  />;
  }

  if (error) {
    return <div>Error loading form: {error}</div>;
  }

  return (
    <>
      {title && (
        <Heading
          as={"h2"}
          fontSize={{ base: "md", md: "md", lg: "18px" }}
          textAlign={"center"}
          color={color}
          pt={"10px"}
          pb={"16px"}
        >
          {title}
        </Heading>
      )}
      {processedFormData.type === "form-getfly" && (
        <FormGetFly {...processedFormData} />
      )}
      {processedFormData.type === "form-sam" && (
        <FormSam {...processedFormData} />
      )}
      {processedFormData.type === "form-google" && (
        <FormGoogle
          url={processedFormData.url}
          divId={processedFormData.divId}
        />
      )}
    </>
  );
};
