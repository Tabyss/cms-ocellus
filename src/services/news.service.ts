import { AxiosResponse } from "axios";
import requestConfig from "./config/requestConfig";
import ENDPOINTS from "./config/endpoints";

interface GetListNewsProps {
    page?: number;
    per_page?: number;
    search?: string;
    order_by?: "asc" | "desc";
    sort_by?: "title" | "created_at";
}

interface GetDetailNewsProps {
    slug: string;
}

interface CreateNewsProps {
    title: string;
    content: string;
    image: File;
}
interface UpdateNewsProps {
    slug: string;
    title: string;
    content: string;
    image?: File;
}

export async function getListNews({
    page,
    per_page,
    search,
    order_by,
    sort_by,
}: GetListNewsProps) {
    try {
        const params = Object.fromEntries(
            Object.entries({
                page,
                per_page,
                search,
                order_by,
                sort_by,
            }).filter(([_, value]) => value !== undefined && value !== "")
        );
        const { data }: AxiosResponse = await requestConfig.get(
            ENDPOINTS.NEWS.LIST,
            {
                params,
            }
        );
        return data;
    } catch (error) {
        console.error("Error fetching news:", error);
        throw new Error("Error fetching news list");
    }
}

export async function getDetailNews({ slug }: GetDetailNewsProps) {
    try {
        const params = Object.fromEntries(
            Object.entries({
                slug,
            }).filter(([_, value]) => value !== undefined && value !== "")
        );
        const { data }: AxiosResponse = await requestConfig.get(
            ENDPOINTS.NEWS.DETAIL,
            {
                params,
            }
        );
        return data;
    } catch (error) {
        console.error("Error fetching news:", error);
        throw new Error(`error fetching news detail for ${slug}`);
    }
}

export const createNewsApi = async (payload: CreateNewsProps) => {
    try {
        const formData = new FormData();
        formData.append("title", payload.title);
        formData.append("content", payload.content);
        formData.append("image", payload.image);

        const token = localStorage.getItem("access_token");
        const response: AxiosResponse = await requestConfig.post(
            ENDPOINTS?.NEWS.CREATE,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response?.data;
    } catch (error: any) {
        throw error.response?.data;
    }
};

export const updateNewsApi = async (payload: UpdateNewsProps) => {
    try {
        const formData = new FormData();
        formData.append("slug", payload.slug);
        formData.append("title", payload.title);
        formData.append("content", payload.content);
        if (payload.image) formData.append("image", payload.image);

        const token = localStorage.getItem("access_token");
        const response: AxiosResponse = await requestConfig.post(
            ENDPOINTS?.NEWS.UPDATE,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response?.data;
    } catch (error: any) {
        throw error.response?.data;
    }
};

export async function DeleteNews({ slug }: GetDetailNewsProps) {
    try {
        const token = localStorage.getItem("access_token");
        const { data }: AxiosResponse = await requestConfig.delete(
            ENDPOINTS.NEWS.DELETE,
            {
                params: { slug: slug },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;
    } catch (error) {
        console.error("Error fetching news:", error);
        throw new Error(`error fetching news detail for ${slug}`);
    }
}
