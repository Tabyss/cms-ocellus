import { Box, Flex, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { MdDelete, MdModeEdit, MdOutlineSortByAlpha } from 'react-icons/md'
import { format } from 'date-fns'
import ModalActivate from './Modal/ModalActivate'
import ModalDelete from './Modal/ModalDelete'
import { useNavigate } from 'react-router-dom'
import { ROUTE_NAME } from '../../../router'
import { useMutation } from 'react-query'
import { DeleteNews } from '../../../services/news.service'

function TableNews(props: any) {
    const { displayNews, orderBy, setOrderBy, refetch } = props
    const { isOpen, onOpen, onClose } = useDisclosure();
    const modalDeleteDis = useDisclosure();
    const navigate = useNavigate()
    const [slug, setSlug] = useState('')

    const [isActive, setIsActive] = useState(false)

    const deleteNewsMutation = useMutation(DeleteNews, {
        onSuccess: () => {
            navigate(ROUTE_NAME.HOME);
        },
        onError: (error: any) => {
            console.error('Error deleting news:', error.message);
        },
    });

    return (
        <Table variant="j-simple" w='100%'>
            <Thead bg="pink.100">
                <Tr>
                    <Th>Title News</Th>
                    <Th>
                        <Flex align="center" gap={1}>
                            Publish Date
                            <Box p='10px' color='#EC1A25' cursor='pointer' >
                                <MdOutlineSortByAlpha size='24px' onClick={() => { setOrderBy(orderBy === 'asc' ? 'desc' : 'asc') }} />
                            </Box>
                        </Flex>
                    </Th>
                    <Th w='160px' textAlign='center'>Publish</Th>
                    <Th w='160px' textAlign='center'>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {displayNews.map((item: any) => (
                    <Tr key={item.slug}>
                        <Td>{item.title}</Td>
                        <Td>{format(new Date(item.created_at), 'dd LLL yyyy')}</Td>
                        <Td>
                            <Text color='#EC1A25' textAlign='center' cursor='pointer'
                                onClick={() => {
                                    onOpen()
                                    setIsActive(item.publishStatus === 'Active' ? false : true)
                                }}
                            >
                                {item.publishStatus}
                            </Text>
                        </Td>
                        <Td>
                            <Flex gap={2} justify='center'>
                                <IconButton
                                    variant='ghost'
                                    aria-label="Edit"
                                    icon={<MdModeEdit />}
                                    onClick={() => navigate(ROUTE_NAME?.UPDATE_NEWS?.replace(':slug', item?.slug))}
                                />
                                <IconButton
                                    variant='ghost'
                                    aria-label="Delete"
                                    icon={<MdDelete />}
                                    onClick={() => {
                                        setSlug(item?.slug)
                                        modalDeleteDis.onOpen()
                                    }}
                                />
                            </Flex>
                        </Td>
                    </Tr>
                ))}
                <ModalActivate
                    isOpen={isOpen}
                    onClose={onClose}
                    isActive={isActive}
                />
                <ModalDelete
                    slug={slug}
                    isOpen={modalDeleteDis.isOpen}
                    onClose={modalDeleteDis.onClose}
                    onConfirm={() => {
                        modalDeleteDis.onClose()
                        deleteNewsMutation.mutate({ slug: slug })
                        refetch
                    }}
                />
            </Tbody>
        </Table>
    )
}

export default TableNews