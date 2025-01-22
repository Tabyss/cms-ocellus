import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { format } from 'date-fns'

function TableContactUs({ data }: any) {
    return (
        <Table variant="j-simple" w='100%'>
            <Thead bg="pink.100">
                <Tr>
                    <Th>Name</Th>
                    <Th>Phone Number</Th>
                    <Th>Email</Th>
                    <Th>Date</Th>
                    <Th>Message</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.map((item: any) => (
                    <Tr key={item.id}>
                        <Td>{item.name}</Td>
                        <Td>{item.phone_number}</Td>
                        <Td>{item.email}</Td>
                        <Td>{format(new Date(item.updated_at), 'dd LLL yyyy')}</Td>
                        <Td w='300px'>{item.content}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}

export default TableContactUs