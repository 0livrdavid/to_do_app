import {  ListTasksCategoryResponse } from "@/api/interfaces/tasks_category/list";
import API from "@/api/api";
import { AxiosError } from "axios";
import http_code from "@/api/http_code";

const list = async (token: string): Promise<ListTasksCategoryResponse> => {
    try {
        const response = await API.get('task_category/list/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        return response.data as ListTasksCategoryResponse;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.response?.status ? http_code[axiosError.response.status] : "Erro desconhecido";
        return { "success": false, "msg": `Falha na tentativa de listar: ${errorMessage}`, "data": null };
    }
};

export default list;

