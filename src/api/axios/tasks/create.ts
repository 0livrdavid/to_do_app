import { CreateTasksData, CreateTasksResponse } from "@/api/interfaces/tasks/create";
import API from "@/api/api";
import { AxiosError } from "axios";
import http_code from "@/api/http_code";

const create = async (data: CreateTasksData, token: string) => {
    try {
        const response = await API.post('task/create/', data, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        return response.data as CreateTasksResponse;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.response?.status ? http_code[axiosError.response.status] : "Erro desconhecido";
        return { "success": false, "msg": `Falha na tentativa de criar: ${errorMessage}`, "data": null } as CreateTasksResponse;
    }
};

export default create;

