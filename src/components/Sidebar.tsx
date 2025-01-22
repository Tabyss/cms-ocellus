import React, { useState } from 'react'
import MenuItem from './MenuItem'
import {
    Flex,
} from '@chakra-ui/react'
import {
    MdMenu,
    MdNewspaper,
    MdOutlineContactSupport,
} from 'react-icons/md'
import { ROUTE_NAME } from '../router'

const MENUS: any[] = [
    { label: 'News', href: ROUTE_NAME?.HOME, icon: MdNewspaper, },
    { label: 'Contact Us', href: ROUTE_NAME?.CONTACT_US, icon: MdOutlineContactSupport, },
]

const Sidebar: React.FC = () => {
    const [expand, setExpand] = useState(true)

    return (
        <Flex
            height='calc(100vh - 56px)'
            bgGradient="linear(180deg, #EC1A25 28.92%, #FE3540 44.11%, #F92D38 55.88%, #F42631 68.88%, #F01F2A 80.27%, #EC1A25 87.68%)"
            backgroundColor='primary'
            width={expand ? '248px' : '72px'}
            padding='16px'
            direction='column'
            gap='16px'
            display={{ base: 'none', md: 'flex' }}
        >
            <MdMenu color='white' cursor='pointer' size='24px' onClick={() => setExpand(!expand)} />
            <Flex
                direction='column'
                gap='8px'
                marginTop='8px'
            >
                {MENUS?.map((menu: any, menuIndex: number) => {
                    return (
                        <MenuItem
                            key={menuIndex}
                            expand={expand}
                            label={menu?.label}
                            icon={menu?.icon}
                            href={menu?.href}
                        />
                    )
                })}
            </Flex>
        </Flex>
    )
}

export default React.memo(Sidebar)