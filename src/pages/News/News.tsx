import { useState } from 'react';
import {
    Button,
    Flex,
    Input,
    Text,
    Heading,
    InputGroup,
    InputLeftElement,
    Spinner,
} from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import TableNews from './components/TableNews';
import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getListNews } from '../../services/news.service';
import { ROUTE_NAME } from '../../router';
import { useQuery } from 'react-query';

const News = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc');
    const newsPerPage = 10;

    const { data, isLoading, isError, refetch } = useQuery(['news', currentPage, searchQuery, orderBy],
        () => getListNews({
            page: currentPage + 1,
            per_page: newsPerPage,
            search: searchQuery,
            order_by: orderBy,
            sort_by: 'created_at',
        }), { keepPreviousData: true }
    );

    const pageInfo = data ? {
        from: data.from,
        to: data.to,
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total,
    } : {
        from: 0,
        to: 0,
        current_page: 0,
        last_page: 0,
        total: 0
    };

    return (
        <Flex w="100%" flexDir="column">
            <Flex justifyContent="space-between" mb={4}>
                <Heading size="chakra_title_large">News</Heading>
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
                <Button
                    variant="solid"
                    bg="#EC1A25"
                    onClick={() => navigate(ROUTE_NAME.CREATE_NEWS)}
                    _hover={{}}
                    _active={{}}
                >
                    <Text size="lg" color="white">
                        + Create News
                    </Text>
                </Button>
            </Flex>

            {isLoading ? (
                <Flex justify="center" align="center" minH="200px">
                    <Spinner size="lg" />
                </Flex>
            ) : isError ? (
                <Flex justify="center" align="center" minH="200px">
                    <Text color="red.500">Error fetching news</Text>
                </Flex>
            ) : (
                <TableNews displayNews={data.data || []} orderBy={orderBy} setOrderBy={setOrderBy} refetch={refetch} />
            )}

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
                    {`Menampilkan ${pageInfo?.from || 0} sampai ${pageInfo?.to || 0} dari ${pageInfo?.total || 0} News`}
                </Heading>
                <ReactPaginate
                    previousLabel="Sebelumnya"
                    nextLabel="Berikutnya"
                    breakLabel="..."
                    pageCount={pageInfo.last_page}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={(e) => {
                        if (pageInfo?.current_page === Number(e.selected + 1)) return;
                        setCurrentPage(e.selected);
                    }}
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
};

export default News;
