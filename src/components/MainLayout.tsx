import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import useCustomToast from '../hooks/useCustomToast'

const MainLayout: React.FC = () => {
    const { showToast } = useCustomToast()

    return (
        <Flex direction='column'>
            <Navbar />
            <Flex width='100%'>
                <Sidebar />
                <Flex
                    height={{
                        base: '100vh',
                        md: 'calc(100vh - 56px)',
                    }}
                    padding={{ base: '0px', md: '24px' }}
                    backgroundColor='surfacePlus1'
                    flex='1'
                    overflow='auto'
                >
                    <Outlet />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default React.memo(MainLayout)