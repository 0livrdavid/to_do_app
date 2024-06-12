export interface UpdateTasksCategoryData {
    name: string;
    description: string;
}

export interface UpdateTasksCategoryResponse {
    success: boolean;
    msg: string;
    data: any;
}
