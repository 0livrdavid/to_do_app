import { UpdateTasksCategoryData, UpdateTasksCategoryResponse } from "@/api/interfaces/tasks_category/update";
import API from "@/api/api";
import { AxiosError } from "axios";
import http_code from "@/api/http_code";

const update = async (data: UpdateTasksCategoryData, token: string, id: number) => {
    try {
        const response = await API.put(`task_category/update/${id}/`, data, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        return response.data as UpdateTasksCategoryResponse;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.response?.status ? http_code[axiosError.response.status] : "Erro desconhecido";
        return { "success": false, "msg": `Falha na tentativa de atualizar: ${errorMessage}`, "data": null } as UpdateTasksCategoryResponse;
    }
};

export default update;

