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
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Đăng ký tư vấn</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormWrapper type="form-poup" title="Để lại thông tin" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
