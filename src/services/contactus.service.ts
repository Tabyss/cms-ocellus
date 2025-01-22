import { AxiosResponse } from "axios";
import requestConfig from "./config/requestConfig";
import ENDPOINTS from "./config/endpoints";

interface GetListContactProps {
    page?: number;
    per_page?: number;
    search?: string;
    order_by?: "asc" | "desc";
    sort_by?: "title" | "created_at";
}

export async function getListContact({
    page,
    per_page,
    search,
    order_by,
    sort_by,
}: GetListContactProps) {
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

        const token = localStorage.getItem("access_token");
        const { data }: AxiosResponse = await requestConfig.get(
            ENDPOINTS.CONTACT_US.LIST,
            {
                params,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;
    } catch (error) {
        console.error("Error fetching Contact us:", error);
        throw new Error("Error fetching news Contact us");
    }
}
