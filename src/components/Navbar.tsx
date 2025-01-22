import React from 'react'
import ModalLoading from '../pages/Login/components/ModalLoading'
import { logoutApi, ProfileApi } from '../services/auth.service.ts'
import { ROUTE_NAME } from '../router'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import { MdLogout, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import Logo from '../assets/Vektors/logo.png'

const Navbar: React.FC = () => {
    const navigate = useNavigate()

    const logoutMutation = useMutation(logoutApi, {
        onSuccess: () => {
            localStorage?.removeItem('access_token')
            navigate(ROUTE_NAME?.LOGIN)
        }
    })

    const getProfile = useQuery('get-profile', ProfileApi, {
        retry: 2,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        onError: (error) => {
            console.error('Error fetching profile:', error);
        }
    })

    return (
        <Flex
            backgroundColor='background'
            boxShadow='0px 4px 4px 0px #00000040'
            height='56px'
            position='relative'
            zIndex='999'
            padding='16px 20px'
            alignItems='center'
            justifyContent='space-between'
            display={{ base: 'none', md: 'flex' }}
        >
            <Flex align='center' gap='10px'>
                <Image
                    src={Logo}
                    alt="Logo"
                    boxSize="40px"
                />
                <Heading size='chakra_title_medium'>
                    Ocellus Indonesia
                </Heading>
            </Flex>
            <Flex gap='24px'>
                <Menu>
                    <MenuButton as={Button} borderRadius='12px'>
                        <Flex alignItems="center" gap="10px">
                            <Avatar
                                name={getProfile?.data?.name}
                                src={getProfile?.data?.image}
                                width='24px'
                                height='24px'
                                size='sm'
                            />
                            <Heading size='chakra_body_large'>{getProfile?.data?.name}</Heading>
                            <MdOutlineKeyboardArrowDown />
                        </Flex>
                    </MenuButton>
                    <MenuList
                        shadow='md'
                        padding='16px'
                        borderRadius='12px'
                    >
                        <MenuItem
                            backgroundColor='transparent'
                            _hover={{ backgroundColor: 'transparent' }}
                            onClick={() => logoutMutation?.mutate()}
                        >
                            <Flex align='center' justify='space-between' w='100%'>
                                <Box as='span' className={`material-symbols-outlined`} color='error'>Log Out</Box>
                                <MdLogout color='error' />
                            </Flex>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>

            <ModalLoading isOpen={logoutMutation?.isLoading} onClose={() => null} />
        </Flex>
    )
}

export default React.memo(Navbar)