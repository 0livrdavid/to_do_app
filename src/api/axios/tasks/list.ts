import {  ListTasksResponse } from "@/api/interfaces/tasks/list";
import API from "@/api/api";
import { AxiosError } from "axios";
import http_code from "@/api/http_code";

const list = async (token: string, task_category_id: number): Promise<ListTasksResponse> => {
    try {
        const response = await API.get(`task/list/${task_category_id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        return response.data as ListTasksResponse;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.response?.status ? http_code[axiosError.response.status] : "Erro desconhecido";
        return { "success": false, "msg": `Falha na tentativa de listar: ${errorMessage}`, "data": null };
    }
};

export default list;

