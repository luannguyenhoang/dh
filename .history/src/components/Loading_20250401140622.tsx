"use client";

import { Center, Spinner, SpinnerProps } from "@chakra-ui/react";

export const Loading = (props: SpinnerProps) => {
  return (
    <Center minH={"70vh"}>
      <Spinner color="red.500" size={"md"} {...props} />
    </Center>
  );
};
