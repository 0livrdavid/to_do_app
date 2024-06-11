export interface ListTasksResponse {
    success: boolean;
    msg: string;
    data: Tasks[] | null;
}

export interface Tasks {
    id: number;
    title: string;
    description: string;
    deadline: string;
    priority: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
    user: number;
    task_category: number;
}
  
export type ListTasksReturn = Tasks[];