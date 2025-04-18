"use client";
import { useDisclosure } from "@chakra-ui/react";
import React, { ReactNode, createContext, useContext, useEffect } from "react";

const ModalContext = createContext<{
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onToggle?: () => void;
  autoOpen?: boolean;
  setAutoOpen?: (value: boolean) => void;
}>({});

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const [autoOpen, setAutoOpen] = React.useState(false);

  useEffect(() => {
    if (autoOpen && onOpen) {
      onOpen();
    }
  }, [autoOpen, onOpen]);

  return (
    <ModalContext.Provider
      value={{ isOpen, onClose, onOpen, onToggle, autoOpen, setAutoOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};
