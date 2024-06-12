'use client'

import { getToken } from "@/api/axios/users/token";
import BlankTasksCategory from "@/components/page/dashboard/blank_tasks_category";
import BlankTasks from "@/components/page/dashboard/blank_tasks";
import { useState, useEffect } from "react";
import list from "@/api/axios/tasks_category/list";
import { Category, ListTasksCategoryResponse, ListTasksCategoryReturn } from "@/api/interfaces/tasks_category/list";
import Tasks from "@/components/page/dashboard/tasks";
import TaskCategory from "@/components/page/dashboard/task_category";

export default function BodyTasksCategory(
  { 
      filterStatusTasks, filterPriorityTasks }: 
  { 
      filterStatusTasks: boolean, 
      filterPriorityTasks: string, 
  }) {
  const [tasks_category, setTasksCategory] = useState<ListTasksCategoryReturn | null>(null);
  const [storeCategory, setStoreCategory] = useState<{ [key: number]: Category }>({});

  useEffect(() => {
    const fetchDataTasksCategory = async () => {
      const response: ListTasksCategoryResponse = await list(getToken());
      if (response && response.data) {
        setTasksCategory(response.data as unknown as ListTasksCategoryReturn);
      }
    };
    
    fetchDataTasksCategory();
  }, []);

  useEffect(() => {
    if (tasks_category) {
      tasks_category.forEach(category => {
        setStoreCategory(prevCategory => ({
          ...prevCategory,
          [category.id]: { 
            id: category.id,
            name: category.name, 
            description: category.description 
          }
        }));
      });
    }
  }, [tasks_category]);

  return (
    <div className="w-full h-full flex flex-1 flex-row gap-4 overflow-x-visible">
      {tasks_category?.map((category: Category) => (
        <div key={category.id} className="flex flex-col items-center min-w-72 h-full justify-start p-4 gap-4 border rounded-lg shadow">
          <div className="flex flex-row w-full justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold">{storeCategory[category.id]?.name || 'Loading...'}</h3>
              <p className="text-sm text-gray-600">{storeCategory[category.id]?.description || 'Loading description...'}</p>
            </div>
            <div>
              <TaskCategory category={category} storeCategory={storeCategory} setStoreCategory={setStoreCategory} />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Tasks task_category_id={category.id} filterStatusTasks={filterStatusTasks} filterPriorityTasks={filterPriorityTasks} />
          </div>
          <BlankTasks task_category_id={category.id} />
        </div>
      ))}
      <BlankTasksCategory />
    </div>
  );
}

