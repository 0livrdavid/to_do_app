export interface ListTasksCategoryResponse {
    success: boolean;
    msg: string;
    data: Category[] | null;
}

export interface Category {
    id: number;
    name: string;
    description: string;
}
  
export type ListTasksCategoryReturn = Category[];