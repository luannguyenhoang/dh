"use client";

import { FormWrapper } from "@/components/FormWrapper";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";

interface ModalBaseProps {
  children?: ReactNode;
  title?: string;
}

export const ModalBase = ({
  children,
  title = "Đăng ký tư vấn",
}: ModalBaseProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Open modal when component mounts
    onOpen();
  }, [onOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={"white"} pt={"12px"} rounded={"sm"} px={"12px"}>
          <ModalCloseButton />
          <ModalBody rounded={"sm"}>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
