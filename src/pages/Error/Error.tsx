import React from 'react'
import { 
    Divider, 
    Flex, 
    Text, 
} from '@chakra-ui/react'

interface IErrorProps {
    errorCode: number
    errorMessage: string
}

const Error: React.FC<IErrorProps> = (props: IErrorProps) => {
    const { errorCode, errorMessage } = props

    return (
        <Flex
            width='100vw'
            height='100vh'
            justifyContent='center'
            alignItems='center'
            gap='1.5rem'
        >
            <Text fontSize='xl' letterSpacing='2px'>
                {errorCode}
            </Text>
            <Divider orientation='vertical' height='30px' />
            <Text fontSize='xl' letterSpacing='2px'>
                {errorMessage}
            </Text>
        </Flex>
    )
}

export default Error
