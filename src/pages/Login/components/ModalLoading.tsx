import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Heading,
    Flex,
    Spinner,
} from '@chakra-ui/react'

interface IModalLoadingProps {
    isOpen: boolean
    onClose: any
}

const ModalLoading: React.FC<IModalLoadingProps> = (props: IModalLoadingProps) => {
    const { isOpen, onClose } = props

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <Flex alignItems='center' gap='1rem' justifyContent='center' padding='16px 24px'>
                        <Spinner color='primary' />
                        <Heading size='chakra_title_large'>Please Wait...</Heading>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default React.memo(ModalLoading)