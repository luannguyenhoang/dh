"use client";

import { CardCat } from "@/components/CardCat";
import { HeadSection } from "@/components/HeadSection";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { defaultDataCategories } from "../../DefaultData/defaultDataCategories";

const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export const Categorys = ({ categoryData }: { categoryData?: any }) => {
  const categories = categoryData?.item || defaultDataCategories.categories;
  const title = categoryData?.tieuDe || defaultDataCategories.title;
  const desc = categoryData?.noiDung || defaultDataCategories.desc;

  return (
    <Box py={"48px"}>
      <Container maxW="6xl">
        <HeadSection title={title} subtitle="chuyên ngành" desc={desc} />
        <SimpleGrid spacing={"8"} columns={{ base: 1, md: 2, lg: 3 }}>
          {categories && categories.length > 0
            ? categories.map((item: any, index: number) => {
                const category = item.list;
                let slug = "";

                if (category && category.tenNganh) {
                  slug =
                    "nganh-" +
                    createSlug(category.tenNganh.replace(/^Ngành\s+/i, ""));
                } else if (item.title) {
                  slug =
                    "nganh-" + createSlug(item.title.replace(/^Ngành\s+/i, ""));
                }
                return (
                  <CardCat
                    key={index}
                    desc={category ? category.gioiThieu : item.desc}
                    path={`/${slug}`}
                    title={category ? category.tenNganh : item.title}
                    image={
                      (category && category.anhNganh?.node?.mediaItemUrl) ||
                      item.image ||
                      "/default-image.jpg"
                    }
                  />
                );
              })
            : null}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
