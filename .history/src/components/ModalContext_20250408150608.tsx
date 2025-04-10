"use client";
import { useDisclosure } from "@chakra-ui/react";
import { ReactNode, createContext, useContext, useEffect } from "react";
const ModalContext = createContext<{
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onToggle?: () => void;
}>({});
export const useModal = () => {
  return useContext(ModalContext);
};
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  useEffect(() => {
    // Delay modal opening by 2 seconds after page load
    const timer = setTimeout(() => {
      onOpen();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onOpen]);

  return (
    <ModalContext.Provider value={{ isOpen, onClose, onOpen, onToggle }}>
      {children}
    </ModalContext.Provider>
  );
};
