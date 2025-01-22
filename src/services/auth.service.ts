import requestConfig from "./config/requestConfig"
import ENDPOINTS from "./config/endpoints"
import { AxiosResponse } from "axios"

interface ILoginApiProps {
    username: string,
    password: string
}

export async function loginApi(props: ILoginApiProps) {
    try {
        const response: AxiosResponse = await requestConfig.post(ENDPOINTS?.AUTH.LOGIN, props)
        return response?.data
    } catch (error: any) {
        throw error.response
    }
}

export async function ProfileApi(): Promise<any> {
    try {
        const token = localStorage.getItem('access_token');
        const response: AxiosResponse = await requestConfig.get(ENDPOINTS?.AUTH.PROFILE, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response?.data;
    } catch (error: any) {
        throw 'ERROR GET PROFILE';
    }
}

export async function logoutApi(): Promise<any> {
    try {
        const response: AxiosResponse = await requestConfig.get(ENDPOINTS?.AUTH.LOGOUT, {
            params: { platform: 'cms' },
            withCredentials: true
        });
        return response?.data;
    } catch (error: any) {
        throw 'ERROR LOGOUT';
    }
}