import {  DeleteTasksCategoryResponse } from "@/api/interfaces/tasks_category/delete";
import API from "@/api/api";
import { AxiosError } from "axios";
import http_code from "@/api/http_code";

const deleteTasksCategory = async (token: string, id: number): Promise<DeleteTasksCategoryResponse> => {
    try {
        const response = await API.delete(`task_category/delete/${id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        return response.data as DeleteTasksCategoryResponse;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.response?.status ? http_code[axiosError.response.status] : "Erro desconhecido";
        return { "success": false, "msg": `Falha na tentativa de listar: ${errorMessage}`, "data": null };
    }
};

export default deleteTasksCategory;

