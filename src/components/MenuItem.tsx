import React from 'react'
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
import { 
    Box,
    Flex, 
    Heading, 
    Icon,
    Link, 
} from '@chakra-ui/react'

interface IMenuItemProps {
    expand: boolean
    label: string
    icon: any
    href: string
}

const MenuItem: React.FC<IMenuItemProps> = (props: IMenuItemProps) => {
    const { expand, label, icon, href } = props

    const location = useLocation()

    return (
        <Link
            as={ReactRouterLink}
            to={href}
            _hover={{}}
        >
            <Flex 
                alignItems='center' 
                padding='12px 8px' 
                gap='12px'
                position='relative'
            >
                {location?.pathname == href
                    ?   <Box position='absolute' left='0px' backgroundColor='white' width='2px' height='16px' />
                    :   null
                }
                <Icon as={icon} color='white' fontSize='24px' />
                {expand && <Heading size='chakra_title_medium' color='onPrimary'>{label}</Heading>}
            </Flex>
        </Link>
    )
}

export default React.memo(MenuItem)