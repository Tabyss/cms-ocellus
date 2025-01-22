import React from 'react'
import {
    Box,
    Flex,
    Image,
    Img,
    Text,
} from '@chakra-ui/react'
import LoginForm from './LoginForm'
import Bg from '../../assets/Vektors/image.png'
import Logo from '../../assets/Vektors/logo.png'

const Login: React.FC = () => {
    return (
        <Flex height="100vh" flexDirection={{ base: "column", md: "row" }}>
            {/* Left Side */}
            <Box
                flex={1}
                bg="red.500"
                p='25px'
                color="white"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="start"
                position="relative"
            >
                <Img src={Bg} h='100%' w='100%' objectFit='cover' position='absolute' left='0'/>
                <Box position="absolute" top={4} left={4} zIndex='10'>
                    <Image
                        src={Logo}
                        alt="Logo"
                        boxSize="50px"
                    />
                </Box>
                <Text fontSize='45px' fontWeight='400' zIndex='10'>
                    Welcome back!
                </Text>
                <Text fontWeight='400' maxW="80%" mt={4} zIndex='10'>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit ut at massa mi.
                    Aliquam in hendrerit urna. Pellentesque sit amet sapien.
                </Text>
            </Box>

            {/* Right Side */}
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                <LoginForm />
            </Box>
        </Flex>
    );
}

export default Login