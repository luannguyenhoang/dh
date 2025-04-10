"use client";

import { FormWrapper } from "@/components/FormWrapper";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";

export const ModalBase = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Open modal when component mounts
    onOpen();
  }, [onOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
         aria-label="poup-modal"
          bg={"white"}
          pt={"12px"}
          rounded={"sm"}
          px={{ base: "12px", lg: "24px" }}
        >
          <ModalCloseButton />
          <ModalBody rounded={"xl"} p={0} maxH={"563px"}>
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
