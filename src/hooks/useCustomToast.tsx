import { 
    UseToastOptions,
    Flex, 
    Heading, 
    Stack, 
    useToast, 
    Text
} from '@chakra-ui/react'

const useCustomToast = () => {
    const toast = useToast()

    const showToast = (options: UseToastOptions) => {
        let currentOptions: UseToastOptions = options

        currentOptions.id = currentOptions?.id??new Date()?.getTime()

        let backgroundColor: string
        let color: string
        switch(currentOptions?.status) {
            case 'success':
                backgroundColor = 'successContainer'
                color = 'onSuccessContainer'
                break
            case 'error':
                backgroundColor = 'errorContainer'
                color = 'onErrorContainer'
                break
            default:
                backgroundColor = 'primaryContainer'
                color = 'onPrimaryContainer'
                break
        }

        const defaultOptions: UseToastOptions = {
            position: 'top-right',
            status: 'success',
            duration: 3000,
            isClosable: false,
            render: () => (
                <Flex
                    padding='24px'
                    gap='18px'
                    borderRadius='16px'
                    backgroundColor={backgroundColor}
                    alignItems='center'
                >
                    <Text 
                        as='span' 
                        className='material-symbols-outlined' 
                        color={color}
                    >
                        {options?.status === 'error' ? 'error' : 'task_alt'}
                    </Text>
                    <Stack>
                        {
                            currentOptions?.title &&
                            <Heading size='chakra_title_medium' color={color}>
                                {currentOptions?.title}
                            </Heading>
                        }
                        {
                            currentOptions?.description &&
                            <Heading size='chakra_title_medium' color={color}>
                                {currentOptions?.description}
                            </Heading>
                        }
                    </Stack>
                    {
                        currentOptions?.isClosable &&
                        <Text 
                            as='span' 
                            className='material-symbols-outlined' 
                            color={color}
                            cursor='pointer'
                            onClick={() => toast?.close(currentOptions?.id || '')}
                        >
                            close
                        </Text>
                    }
                </Flex>
            ),
        }

        toast({
            ...defaultOptions,
            ...options,
        })
    }

    return { showToast }
}

export default useCustomToast