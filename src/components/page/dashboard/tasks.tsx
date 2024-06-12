"use client"

import TaskIterator from "@/utils/TaskIterator";
import { useEffect, useState } from "react";
import { ListTasksResponse } from "@/api/interfaces/tasks/list";
import list from "@/api/axios/tasks/list";
import { getToken } from "@/api/axios/users/token";
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
  const [tasks, setTasks] = useState<Tasks[]>([]);

  useEffect(() => {
    const fetchDataTasks = async () => {
      const response: ListTasksResponse = await list(getToken(), task_category_id);
      if (response && response.data) {
        const taskIterator = new TaskIterator(response.data as Tasks[]);
        const filteredTasks = taskIterator
          .filterByCompletion(filterStatusTasks)
          .filterByPriority(filterPriorityTasks)
          .getTasks();
        setTasks(filteredTasks);
      }
    };
    
    fetchDataTasks();
  }, [task_category_id, filterStatusTasks, filterPriorityTasks]);

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <Task key={task.id} taskData={task} task_category_id={task_category_id}/>
      ))}
    </div>
  );
}