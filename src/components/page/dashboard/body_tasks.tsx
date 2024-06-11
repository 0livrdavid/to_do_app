'use client'

import { getToken } from "@/api/axios/users/token";
import BlankTasksCategory from "@/components/page/dashboard/blank_tasks_category";
import BlankTasks from "@/components/page/dashboard/blank_tasks";
import { useState, useEffect } from "react";
import list from "@/api/axios/tasks_category/list";
import { Category, ListTasksCategoryResponse, ListTasksCategoryReturn } from "@/api/interfaces/tasks_category/list";
import Tasks from "@/components/page/dashboard/tasks";

export default function BodyTasksCategory() {
  const [tasks_category, setTasksCategory] = useState<ListTasksCategoryReturn | null>(null);

  useEffect(() => {
    const fetchDataTasksCategory = async () => {
      const response: ListTasksCategoryResponse = await list(getToken());
      if (response && response.data) {
        setTasksCategory(response.data as unknown as ListTasksCategoryReturn);
      }
    };
    
    fetchDataTasksCategory();
  }, []);

  return (
    <div className="w-full h-full flex flex-1 flex-row gap-4 overflow-x-visible">
      {tasks_category?.map((category: Category) => (
        <div key={category.id} className="flex flex-col items-center min-w-72 h-full justify-start p-4 gap-4 border rounded-lg shadow">
          <div className="flex flex-col gap-2 items-center justify-center">
            <h3 className="text-lg font-semibold">{category.name}</h3>
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Tasks task_category_id={category.id} />
          </div>
          <BlankTasks task_category_id={category.id} />
        </div>
      ))}
      <BlankTasksCategory />
    </div>
  );
}

