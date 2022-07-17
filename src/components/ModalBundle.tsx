import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'

type ModalBundleProps = {
  title: string
  isOpen: boolean
  onClose: () => void
  children: JSX.Element
}

export const ModalBundle = ({
  title,
  isOpen,
  onClose,
  children
}: ModalBundleProps) => {
  return (
    <Modal
      isOpen={ isOpen }
      onClose={ onClose }
    >
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader> Test Modal </ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          { children }
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
