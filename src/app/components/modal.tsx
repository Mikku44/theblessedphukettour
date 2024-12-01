'use client'
import { Button } from "@nextui-org/button";
import {Modal as NextModal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/modal";

export default function Modal({text:{button,header,accept,close},children,className}:any) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className={className}>{button}</Button>
      <NextModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
              <ModalBody>
                {children}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {close||"Close"}
                </Button>
                <Button color="primary" className="bg-[--primary]" onPress={onClose}>
                  {accept ||"Accept"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </NextModal>
    </>
  );
}