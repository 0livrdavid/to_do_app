export interface CreateTasksData {
    title: string;
    description: string;
    deadline: string;
    priority: string;
    user: number;
    task_category: number;
}

export interface CreateTasksResponse {
    success: boolean;
    msg: string;
    data: any;
}
