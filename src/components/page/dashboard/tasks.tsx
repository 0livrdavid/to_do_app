"use client"

import { useEffect, useState } from "react";
import { ListTasksResponse } from "@/api/interfaces/tasks/list";
import list from "@/api/axios/tasks/list";
import { getToken } from "@/api/axios/users/token";
import { ListTasksReturn } from "@/api/interfaces/tasks/list";
import type { Tasks } from "@/api/interfaces/tasks/list";
import Task from "@/components/page/dashboard/task";

export default function Tasks({ 
  task_category_id,
  filterStatusTasks,
  filterPriorityTasks
}: { 
  task_category_id: number,
  filterStatusTasks: boolean,
  filterPriorityTasks: string
}) {
  const [tasks, setTasks] = useState<ListTasksReturn | null>(null);
  const [storeTask, setStoreTask] = useState<{ [key: number]: Tasks }>({});

  useEffect(() => {
    if (tasks) {
      const updatedStoreTask = tasks.reduce((acc, task) => ({
        ...acc,
        [task.id]: {
          id: task.id,
          title: task.title,
          description: task.description,
          completed: task.completed,
          deadline: task.deadline,
          priority: task.priority,
        }
      }), {});
      setStoreTask(updatedStoreTask);
    }
  }, [tasks]);

  useEffect(() => {
    const fetchDataTasks = async () => {
      const response: ListTasksResponse = await list(getToken(), task_category_id);
      if (response && response.data) {
        const filteredTasks = (response.data as unknown as ListTasksReturn)
          .filter(task => task.completed === filterStatusTasks)
          .filter(task => filterPriorityTasks === "all" ? true : task.priority === filterPriorityTasks);
        setTasks(filteredTasks);
      }
    };
    
    fetchDataTasks();
  }, [task_category_id, filterStatusTasks, filterPriorityTasks]);

  return (
    <div className="flex flex-col gap-4">
      {tasks && tasks.map((task) => (
        <Task key={task.id} taskData={task} task_category_id={task_category_id}/>
      ))}
    </div>
  );
}