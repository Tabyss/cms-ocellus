import {
    Flex,
    Heading,
    Image as ChakraImage,
    Center,
    Button,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import React, { useRef, useState } from 'react';
import useCustomToast from '../../../../hooks/useCustomToast';
import { MdCloudUpload } from 'react-icons/md';

interface ImageInputProps {
    formData: {
        attachment_preview?: string | null;
    };
    setFormData: any
}

const ImageInput: React.FC<ImageInputProps> = ({ formData, setFormData }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [imageUpload, setImageUpload] = useState<string | null>(null);
    const { showToast } = useCustomToast();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const onDropImage = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                setImageUpload(reader.result as string);
            };
            reader.onerror = () => {
                showToast({
                    status: 'error',
                    isClosable: true,
                    duration: 15000,
                    description: 'Failed to read file. Please try again.',
                });
            };
            reader.readAsDataURL(file);
            setFormData((prev: any) => ({
                ...prev,
                attachment: file,
            }));
        }
    };

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop: onDropImage,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        maxFiles: 1,
        multiple: false,
        maxSize: 3 * 1024 * 1024, // 2MB
        onDropRejected: () => {
            showToast({
                status: 'error',
                isClosable: true,
                duration: 15000,
                description: 'File must be JPG or PNG and smaller than 2MB.',
            });
        },
    });

    const openFileInput = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevents button click from triggering the parent click
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <Flex position="relative" overflow="hidden" w="100%" maxH="150px">
            <Flex w='100%' h='100%' rounded='8px' cursor='pointer' border='1px solid var(--chakra-colors-surfaceVariant)' {...getRootProps({ onClick: (e) => e.preventDefault() })}>
                <input {...getInputProps()} />
                {!formData?.attachment_preview && !imageUpload ? (
                    <Flex w='100%' h='100%' flexDir='column' p='18px' align='center' justify='center'>
                        <Flex
                            h="max-content"
                            p="18px"
                            rounded="8px"
                            color="#EC1A25"
                            boxShadow="2px 4px 10px 0px #0000001A"
                        >
                            <MdCloudUpload />
                        </Flex>
                        <Flex flexDir="column" align="center">
                            <Flex gap="6px">
                                <Heading
                                    size="chakra_label_large"
                                    color="#EC1A25"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        open(); // Open the file input dialog
                                    }}
                                >
                                    Click to Upload
                                </Heading>
                                <Heading size="chakra_label_large" color="outline">
                                    or drag and drop
                                </Heading>
                            </Flex>
                            <Heading size="chakra_label_large" color="outline">
                                JPEG, JPG or PNG (MAX 3 MB)
                            </Heading>
                        </Flex>
                    </Flex>
                ) : (
                    <Flex w='100%' h='100%' minH='100px' rounded='8px' justify='center' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        {isHovering && (
                            <>
                                <Center
                                    w="100%"
                                    zIndex="2"
                                    position="absolute"
                                    h="100%"
                                    rounded="8px"
                                    bg="neutral.10"
                                    opacity="0.5"
                                ></Center>
                                <Flex
                                    position="absolute"
                                    w="100%"
                                    h="100%"
                                    justify="center"
                                    align="center"
                                >
                                    <Button
                                        zIndex="10"
                                        bg="neutral.100"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            open(); // Open the file input dialog
                                        }}
                                    >
                                        <Heading size="chakra_label_medium" color="primary.50">
                                            Change
                                        </Heading>
                                    </Button>
                                </Flex>
                            </>
                        )}
                        <ChakraImage
                            w="400px"
                            src={imageUpload || formData?.attachment_preview || ''}
                            alt="preview"
                            objectFit="contain"
                        />
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default ImageInput;
