import { Button, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ROUTE_NAME } from '../../../../router';
import RichTextEditor from './RichTextEditor';
import ImageInput from './ImageInput';
import { getDetailNews, createNewsApi, updateNewsApi } from '../../../../services/news.service';

function CreateNews() {
    const location = useLocation();
    const { slug }: any = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    const isUpdate = location.pathname.startsWith('/update-news');

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        attachment_preview: '',
        attachment: undefined,
    });

    useQuery(['newsDetail', slug], () => getDetailNews({ slug: slug }), {
        enabled: isUpdate,
        onSuccess: (data) => {
            setFormData({
                title: data?.title || '',
                content: data?.content || '',
                attachment_preview: data?.image || '',
                attachment: undefined,
            });
        },
        onError: (error: any) => {
            console.error('Error fetching news details:', error.message);
        },
    }
    );

    const createNewsMutation = useMutation(createNewsApi, {
        onSuccess: () => {
            navigate(ROUTE_NAME.HOME);
        },
        onError: (error: any) => {
            if (error?.throwable && typeof error.throwable === "object") {
                Object.entries(error.throwable)
                    .map(([field, messages]) => {
                        if (Array.isArray(messages) && messages.every(msg => typeof msg === "string")) {
                            return toast({
                                position: 'top-right',
                                title: "Validation Error",
                                description: `${field}: ${messages}`,
                                status: "error",
                                duration: 5000,
                            });
                        }
                    })
            }
        },
    });

    const updateNewsMutation = useMutation(updateNewsApi, {
        onSuccess: () => {
            navigate(ROUTE_NAME.HOME);
        },
        onError: (error: any) => {
            if (error?.throwable && typeof error.throwable === "object") {
                Object.entries(error.throwable)
                    .map(([field, messages]) => {
                        if (Array.isArray(messages) && messages.every(msg => typeof msg === "string")) {
                            return toast({
                                position: 'top-right',
                                title: "Validation Error",
                                description: `${field}: ${messages}`,
                                status: "error",
                                duration: 5000,
                            });
                        }
                    })
            }
        },
    });

    const handlePublish = () => {
        const payload: any = {
            title: formData.title,
            content: formData.content,
            ...(formData.attachment ? { image: formData.attachment } : {}),
            ...(isUpdate && { slug: slug }),
        };

        if (isUpdate) {
            if(formData.content && formData.title){
                updateNewsMutation.mutate(payload);
            } else{
                toast({
                    position: 'top-right',
                    title: "Validation Error",
                    description: "Harap lengkapi semua inputan yang masih kosong.",
                    status: "error",
                    duration: 5000,
                });
            }
        } else {
            createNewsMutation.mutate(payload);
        }
    };

    return (
        <Flex w="100%" flexDir="column">
            <Flex justifyContent="space-between" mb={4}>
                <Heading size="chakra_title_large">
                    {isUpdate ? 'Update News' : 'Create News'}
                </Heading>
            </Flex>
            <Flex flexDir="column" gap="20px">
                <Button
                    variant="solid"
                    bg="#EC1A25"
                    w="max-content"
                    onClick={handlePublish}
                    isLoading={createNewsMutation.isLoading || updateNewsMutation.isLoading}
                    _hover={{}}
                    _active={{}}
                >
                    <Text size="lg" color="white">
                        Publish
                    </Text>
                </Button>
                <ImageInput formData={formData} setFormData={setFormData} />
                <RichTextEditor mode={isUpdate} formData={formData} setFormData={setFormData} />
            </Flex>
        </Flex>
    );
}

export default CreateNews;
