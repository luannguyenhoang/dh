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
import { ReactNode, useEffect } from "react";

interface ModalBaseProps {
  children?: ReactNode;
  title?: string;
}

export const ModalBase = ({ children, title = "Đăng ký tư vấn" }: ModalBaseProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Open modal when component mounts
    onOpen();
  }, [onOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {children || <FormWrapper type="form-poup" title="Để lại thông tin" />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
