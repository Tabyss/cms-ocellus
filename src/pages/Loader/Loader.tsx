import React from 'react'
import { 
    Center, 
    Flex, 
    Spinner, 
} from '@chakra-ui/react'

const Loader: React.FC = () => {
    return (
        <Flex
            as={Center}
            height='100vh'
            width='100%'
        >
            <Spinner size='xl' />
        </Flex>
    )
}

export default Loader