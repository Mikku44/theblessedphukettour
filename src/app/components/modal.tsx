
"use client";

import { Button, Modal as FlowModal } from "flowbite-react";
import { useState } from "react";

export function Modal({text:{button,header,accept,close},children,className}:any) {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <Button className={className} onClick={() => setOpenModal(true)}>{button}</Button>
      <FlowModal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <FlowModal.Header>{header || "Modal"}</FlowModal.Header>
        <FlowModal.Body>
          {children}
        </FlowModal.Body>
        <FlowModal.Footer>
          <Button onClick={() => setOpenModal(false)}>{accept || "Accept"}</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            {close || "Close"}
          </Button>
        </FlowModal.Footer>
      </FlowModal>
    </>
  );
}
