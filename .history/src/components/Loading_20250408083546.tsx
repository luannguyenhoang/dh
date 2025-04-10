"use client";

import { Center, Spinner, SpinnerProps } from "@chakra-ui/react";

export const Loading = (props: SpinnerProps) => {
  return (
    <Center  height={"100%"} >
      <Spinner color="red.500" size={"md"} {...props} />
    </Center>
  );
};
