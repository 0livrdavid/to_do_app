export interface UpdateTasksData {
    title: string;
    description: string;
    deadline: string;
    priority: string;
    completed: boolean;
    user: number;
    task_category: number;
}

export interface UpdateTasksResponse {
    success: boolean;
    msg: string;
    data: any;
}
