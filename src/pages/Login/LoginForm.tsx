import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useMutation } from "react-query";
import { loginApi } from "../../services/auth.service.ts";
import { useNavigate } from "react-router-dom";
import { ROUTE_NAME } from "../../router";

const LoginForm: React.FC = () => {
    const navigate = useNavigate()
    const [account, setAccount] = useState({
        username: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate({
            username: account.username,
            password: account.password
        })
    };

    const loginMutation = useMutation(loginApi, {
        onSuccess: (data) => {
            if (!data?.access_token) return
            localStorage?.setItem('access_token', data?.access_token)
            localStorage.setItem('account', JSON.stringify(data?.user));
            navigate(ROUTE_NAME?.HOME)
        },
        onError: (error: any) => {
            setErrorMsg(error?.data?.msg_str)
        }
    })


    return (
        <Box
            w={{ base: "100%", md: "50%" }}
            p={8}
            display="flex"
            flexDirection="column"
            justifyContent="center"
        >
            <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
                Log In
            </Text>
            <form onSubmit={handleSubmit}>
                <Flex flexDir='column' gap='16px'>
                    {loginMutation.isError ? <Text color='error'>{errorMsg}</Text> : null}
                    <FormControl variant="floating" id="email" isRequired>
                        <Input type="text" placeholder=" " value={account.username} onChange={(e) => setAccount((prev) => { return { ...prev, username: e.target.value } })} />
                        <FormLabel>Email</FormLabel>
                    </FormControl>
                    <FormControl variant="floating" id="password" isRequired>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder=" "
                            value={account.password}
                            onChange={(e) => setAccount((prev) => { return { ...prev, password: e.target.value } })}
                        />
                        <FormLabel>Password</FormLabel>
                        <Button
                            position='absolute'
                            top='4px'
                            right='4px'
                            variant="ghost"
                            onClick={togglePasswordVisibility}
                            size="sm"
                            zIndex='10'
                        >
                            {showPassword ? <FiEye /> : <FiEyeOff />}
                        </Button>
                    </FormControl>
                    <Button
                        type="submit"
                        bg="red.500"
                        color="white"
                        _hover={{ bg: "red.600" }}
                        width="full"
                        isLoading={loginMutation.isLoading}
                    >
                        Login
                    </Button>
                </Flex>
            </form>
        </Box>
    );
};

export default LoginForm;
