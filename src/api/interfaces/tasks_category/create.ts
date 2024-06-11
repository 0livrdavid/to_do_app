export interface CreateTasksCategoryData {
    name: string;
    description: string;
}

export interface CreateTasksCategoryResponse {
    success: boolean;
    msg: string;
    data: any;
}
