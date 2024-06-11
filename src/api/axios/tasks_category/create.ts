import { CreateTasksCategoryData, CreateTasksCategoryResponse } from "@/api/interfaces/tasks_category/create";
import API from "@/api/api";
import { AxiosError } from "axios";
import http_code from "@/api/http_code";

const create = async (data: CreateTasksCategoryData, token: string) => {
    try {
        const response = await API.post('task_category/create/', data, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        return response.data as CreateTasksCategoryResponse;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.response?.status ? http_code[axiosError.response.status] : "Erro desconhecido";
        return { "success": false, "msg": `Falha na tentativa de criar: ${errorMessage}`, "data": null } as CreateTasksCategoryResponse;
    }
};

export default create;

