"use client";

import { FormWrapper } from "@/components/FormWrapper";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useModal } from "@/components/ModalContext";

interface ModalBaseProps {
  children?: ReactNode;
}

export const ModalBase = ({ children }: ModalBaseProps) => {
  const { isOpen, onClose } = useModal();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={"white"} pt={"12px"} rounded={"sm"} px={"12px"}>
          <ModalCloseButton />
          <ModalBody rounded={"sm"}>
            {children || <FormWrapper type="form-poup" title="Để lại thông tin" />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
