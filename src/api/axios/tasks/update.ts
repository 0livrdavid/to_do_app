import { UpdateTasksData, UpdateTasksResponse } from "@/api/interfaces/tasks/update";
import API from "@/api/api";
import { AxiosError } from "axios";
import http_code from "@/api/http_code";

const update = async (data: UpdateTasksData, token: string, id: number) => {
    try {
        const response = await API.put(`task/update/${id}/`, data, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        return response.data as UpdateTasksResponse;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.response?.status ? http_code[axiosError.response.status] : "Erro desconhecido";
        return { "success": false, "msg": `Falha na tentativa de atualizar: ${errorMessage}`, "data": null } as UpdateTasksResponse;
    }
};

export default update;

