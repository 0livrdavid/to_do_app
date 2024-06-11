import { useEffect, useState } from "react";
import { ListTasksResponse } from "@/api/interfaces/tasks/list";
import list from "@/api/axios/tasks/list";
import { getToken } from "@/api/axios/users/token";
import { ListTasksReturn } from "@/api/interfaces/tasks/list";

export default function Tasks({ task_category_id }: { task_category_id: number }) {
  const [tasks, setTasks] = useState<ListTasksReturn | null>(null);

  useEffect(() => {
    const fetchDataTasks = async () => {
      const response: ListTasksResponse = await list(getToken(), task_category_id);
      if (response && response.data) {
        setTasks(response.data as unknown as ListTasksReturn);
      }
    };
    
    fetchDataTasks();
  }, [task_category_id]);

  return (
    <div className="flex flex-col gap-4 w-full overflow-y-auto">
      {tasks && tasks.map((task) => (
        <div key={task.id} className="bg-fiord-200 w-full border border-fiord-600 rounded-md p-4">
          {task.title}
        </div>
      ))}
    </div>
  );
}