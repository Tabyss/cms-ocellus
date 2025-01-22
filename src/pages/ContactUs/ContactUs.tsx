import { Flex, InputGroup, InputLeftElement, Input, Heading} from '@chakra-ui/react';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import TableContactUs from './components/TableContactUs';
import { useQuery } from 'react-query';
import { getListContact } from '../../services/contactus.service';

function ContactUs() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    // const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc');
    const newsPerPage = 10;

    const { data } = useQuery(
        ['contact-us', currentPage, searchQuery],
        () =>
            getListContact({
                page: currentPage + 1, 
                per_page: newsPerPage,
                search: searchQuery,
                order_by: 'asc',
                sort_by: 'created_at',
            }),
        { keepPreviousData: true }
    );

    const pageInfo = data
        ? {
              from: data.from,
              to: data.to,
              current_page: data.current_page,
              last_page: data.last_page,
              total: data.total,
          }
        : {
              from: 0,
              to: 0,
              current_page: 0,
              last_page: 0,
              total: 0,
          };

    const handlePageChange = (e: { selected: number }) => {
        if (pageInfo.current_page === e.selected + 1) return;
        setCurrentPage(e.selected);
    };

    return (
        <Flex w="100%" flexDir="column">
            <Flex justifyContent="space-between" mb={4}>
                <Heading size="chakra_title_large">Contact Us</Heading>
            </Flex>
            <Flex justify="space-between">
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <MdSearch />
                    </InputLeftElement>
                    <Input
                        w="max-content"
                        placeholder="Search news"
                        mb={4}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </InputGroup>
            </Flex>

            <TableContactUs data={data?.data || []} />

            <Flex
                p="12px 16px"
                bg="#FFC6C9"
                rounded="0 0 16px 16px"
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                marginBottom="100px"
            >
                <Heading size="chakra_body_medium">
                    {`Menampilkan ${pageInfo.from || 0} sampai ${pageInfo.to || 0} dari ${pageInfo.total || 0} Contact`}
                </Heading>
                <ReactPaginate
                    previousLabel="Sebelumnya"
                    nextLabel="Berikutnya"
                    breakLabel="..."
                    pageCount={pageInfo.last_page}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageChange}
                    containerClassName="react-paginate-pagination"
                    pageClassName="react-paginate-page-item"
                    previousClassName="react-paginate-page-item-previous"
                    nextClassName="react-paginate-page-item-next"
                    activeClassName="react-paginate-page-item-active"
                    pageLinkClassName="react-paginate-page-item"
                    previousLinkClassName="react-paginate-page-item"
                    nextLinkClassName="react-paginate-page-item"
                />
            </Flex>
        </Flex>
    );
}

export default ContactUs;
