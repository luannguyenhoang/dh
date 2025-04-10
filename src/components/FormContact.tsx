"use client";

import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  InputProps,
  Select,
  SelectProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BtnTheme } from "./BtnTheme";
import { Loading } from "./Loading";

interface IForm {
  title?: string;
}

export const FormContact = (props: IForm) => {
  const { title } = props;

  const [sucess, setSucess] = useState(false);

  const validateName = (value: string) => {
    let error;
    if (!value) {
      error = "Họ tên là bắt buộc";
    } else if (value?.trim().length < 2) {
      error = "Tên phải lớn hơn 2 ký tự😱";
    }
    return error;
  };

  const validatePhone = (value: string) => {
    const regex = /^(0[3-9]{1}\d{8})|(02[0-9]{1}\d{7,8})$/;
    let error;
    if (!value) {
      error = "Số điện thoại là bắt buộc";
    } else if (!regex.test(value.trim())) {
      error = "Số điện thoại không hợp lệ😱";
    }
    return error;
  };

  const handleSubmit = async (formData: any, actions: any) => {
    const NEXT_PUBLIC_GOOGLE_SCRIPT_WEB_APP_URL =
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_WEB_APP_URL || "";
    try {
      const res = await fetch(NEXT_PUBLIC_GOOGLE_SCRIPT_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });
      actions.setSubmitting(false);
      setSucess(true);
    } catch (error) {
      alert("Đăng ký không thành công, vui lòng thử lại!");
      actions.setSubmitting(false);
      setSucess(false);
    }
  };

  return (
    <Box
      bg={"gray.100"}
      rounded={"sm"}
      px={"24px"}
      py={"24px"}
      h={"max-content"}
    >
      <Heading
        as={"h2"}
        size={"md"}
        textAlign={"center"}
        pb={"24px"}
        color={sucess ? "green.700" : "gray.700"}
      >
        {!sucess && (title || "Tư vấn lộ trình học và ưu đãi")}
        {sucess && "Thành công"}
      </Heading>
      {!sucess && (
        <Formik
          initialValues={{
            name: "",
            phone: "",
            "name-child": "",
            class: "",
            course: "",
            email: "",
            place: "",
          }}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
        >
          {(props) => (
            <Form>
              <VStack spacing={"12px"}>
                <Field name="name" validate={validateName}>
                  {({ field, form }: { field: InputProps; form: any }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <Input
                        {...field}
                        bg={"white"}
                        type="text"
                        name="name"
                        placeholder="Nhập họ tên bạn..."
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <HStack
                  spacing={"8px"}
                  justify={"space-between"}
                  w={"full"}
                  align={"flex-start"}
                >
                  <Field name="email">
                    {({ field, form }: { field: InputProps; form: any }) => (
                      <FormControl flex={1}>
                        <Input
                          {...field}
                          bg={"white"}
                          type="email"
                          name="email"
                          placeholder="Nhập email..."
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="phone" validate={validatePhone}>
                    {({ field, form }: { field: InputProps; form: any }) => (
                      <FormControl
                        isRequired
                        flex={1}
                        isInvalid={form.errors.phone && form.touched.phone}
                      >
                        <Input
                          {...field}
                          bg={"white"}
                          type="tel"
                          name="phone"
                          placeholder="Nhập số điện thoại..."
                        />
                        <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </HStack>

                <Field name="course">
                  {({ field, form }: { field: SelectProps; form: any }) => (
                    <FormControl>
                      <Select
                        {...field}
                        bg={"white"}
                        placeholder="Chọn ngành học"
                        name="course"
                      >
                        <option>
                          Ngành kinh doanh xuất nhập khẩu nông sản
                        </option>
                        <option>Ngành công nghệ thực phẩm</option>
                        <option>Ngành công nghệ thực phẩm tiếng Anh</option>
                        <option>Ngành nông nghiệp công nghệ cao</option>
                      </Select>
                      <FormErrorMessage>{form.errors?.course}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <BtnTheme
                  isLoading={props.isSubmitting}
                  type="submit"
                  colorScheme="red"
                  w={"full"}
                  mt={"24px"}
                >
                  Đăng ký tư vấn
                </BtnTheme>

                <Text fontSize={".7rem"} fontWeight={"bold"}>
                  * Vui lòng để ý điện thoại, chúng tôi sẽ liên hệ bạn sớm
                  (trong vòng 24h)
                </Text>
              </VStack>
            </Form>
          )}
        </Formik>
      )}

      {sucess && (
        <Center flexDir={"column"}>
          <Image
            priority
            src={"/success-icon.png"}
            width={100}
            height={100}
            alt="Thành công"
          />
          <Text fontWeight={600} color={"green.700"} pt={"16px"}>
            Chúng tôi sẽ liên hệ lại với bạn!
          </Text>
        </Center>
      )}
    </Box>
  );
};

const comonForm = ({ id, href }: { id: string; href: string }) => {
  const generateMatch = ({ utm, value }: { utm: string; value?: string }) => {
    const valueCur = value || "=([^;]+)";
    const matchers = document.cookie.match(new RegExp(utm + valueCur));
    return matchers ? matchers : [];
  };

  let r =
    window.document.referrer != ""
      ? window.document.referrer
      : window.location.origin;
  const regex = /(https?:\/\/.*?)\//g;
  const furl = regex.exec(r);
  r = furl ? furl[0] : r;
  const f = document.createElement("iframe");
  const url_string = new URLSearchParams(window.location.search);
  let utm_source, utm_campaign, utm_medium, utm_content, utm_term;
  if (
    (!url_string.has("utm_source") || url_string.get("utm_source") == "") &&
    generateMatch({ utm: "utm_source" }) != null
  ) {
    r += "&" + generateMatch({ utm: "utm_source" })[0];
  } else {
    r +=
      url_string.get("utm_source") != null
        ? "&utm_source=" + url_string.get("utm_source")
        : "";
  }
  if (
    (!url_string.has("utm_campaign") || url_string.get("utm_campaign") == "") &&
    generateMatch({ utm: "utm_campaign" }) != null
  ) {
    r += "&" + generateMatch({ utm: "utm_campaign" })[0];
  } else {
    r +=
      url_string.get("utm_campaign") != null
        ? "&utm_campaign=" + url_string.get("utm_campaign")
        : "";
  }
  if (
    (!url_string.has("utm_medium") || url_string.get("utm_medium") == "") &&
    generateMatch({ utm: "utm_medium" }) != null
  ) {
    r += "&" + generateMatch({ utm: "utm_medium" })[0];
  } else {
    r +=
      url_string.get("utm_medium") != null
        ? "&utm_medium=" + url_string.get("utm_medium")
        : "";
  }
  if (
    (!url_string.has("utm_content") || url_string.get("utm_content") == "") &&
    generateMatch({ utm: "utm_content" }) != null
  ) {
    r += "&" + generateMatch({ utm: "utm_content" })[0];
  } else {
    r +=
      url_string.get("utm_content") != null
        ? "&utm_content=" + url_string.get("utm_content")
        : "";
  }
  if (
    (!url_string.has("utm_term") || url_string.get("utm_term") == "") &&
    generateMatch({ utm: "utm_term" }) != null
  ) {
    r += "&" + generateMatch({ utm: "utm_term" })[0];
  } else {
    r +=
      url_string.get("utm_term") != null
        ? "&utm_term=" + url_string.get("utm_term")
        : "";
  }
  if (
    (!url_string.has("utm_user") || url_string.get("utm_user") == "") &&
    generateMatch({ utm: "utm_user" }) != null
  ) {
    r += "&" + generateMatch({ utm: "utm_user" })[0];
  } else {
    r +=
      url_string.get("utm_user") != null
        ? "&utm_user=" + url_string.get("utm_user")
        : "";
  }
  if (
    (!url_string.has("utm_account") || url_string.get("utm_account") == "") &&
    generateMatch({ utm: "utm_account" }) != null
  ) {
    r += "&" + generateMatch({ utm: "utm_account" })[0];
  } else {
    r +=
      url_string.get("utm_account") != null
        ? "&utm_account=" + url_string.get("utm_account")
        : "";
  }
  r += "&full_url=" + encodeURIComponent(window.location.href);
  r += "&full_url=" + encodeURIComponent(window.location.href);
  f.setAttribute("src", href + r);
  f.style.width = "100%";
  f.style.height = "380px";
  f.setAttribute("frameborder", "0");
  f.setAttribute("marginheight", "0");
  f.setAttribute("marginwidth", "0");
  const s = document.getElementById(id);

  if (!s?.hasChildNodes()) s?.appendChild(f);
};

export const FormMain = ({ title }: { title?: string }) => {
  const [id, setId] = useState("getfly-optin-form-iframe-1695175881155");
  const [href, setHref] = useState(
    "https://aum.getflycrm.com/api/forms/viewform/?key=AxFWg9xmg9RGLjPsUiSwBCtbhyYTGWB3rBOtmMnxfQCEc9Draw&referrer="
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getForm = async () => {
      try {
        const res = await fetch(`/api/data-form/?type=form-main`);
        const data = await res.json();
        const id = data?.id || "";
        id && setId(id);
        const href = data?.href || "";
        href && setHref(href);

        comonForm({
          id,
          href,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getForm();
  }, [id, href, isLoading]);

  return (
    <Box minH={"45vh"}>
      {title && (
        <Heading
          as={"h2"}
          size={{ base: "md", md: "lg" }}
          textAlign={"center"}
          color={"blue.700"}
          pb={"16px"}
        >
          Để lại thông tin
        </Heading>
      )}
      {isLoading && <Loading  />}
      {!isLoading && <div id={id} />}
    </Box>
  );
};

export const FormPoup = ({ title }: { title?: string }) => {
  const [id, setId] = useState("getfly-optin-form-iframe-1695175842604");
  const [href, setHref] = useState(
    "https://aum.getflycrm.com/api/forms/viewform/?key=Gks7frPWuBMzyzUC6CzH0zKCnGrO7OBcnenVzuBlKcWsplsPTm&referrer="
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getForm = async () => {
      try {
        const res = await fetch(`/api/data-form/?type=form-poup`);
        const data = await res.json();
        const id = data?.id || "";
        id && setId(id);
        const href = data?.href || "";
        href && setHref(href);

        comonForm({
          id,
          href,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getForm();
  }, [id, href, isLoading]);

  return (
    <Box minH={"45vh"}>
      {title && (
        <Heading
          as={"h2"}
          size={{ base: "md", md: "lg" }}
          textAlign={"center"}
          color={"blue.700"}
          pb={"16px"}
        >
          Để lại thông tin
        </Heading>
      )}
      {isLoading && <Loading  />}
      {!isLoading && <div id={id} />}
    </Box>
  );
};
