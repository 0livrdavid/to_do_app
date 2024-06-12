'use client'

import BodyTasksCategory from "@/components/page/dashboard/body_tasks";
import BodyFiltersTasks from "@/components/page/dashboard/body_filters_tasks";
import { getToken } from "@/api/axios/users/token";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [ filterStatusTasks, setFilterStatusTasks ] = useState<boolean>(false);
  const [ filterPriorityTasks, setFilterPriorityTasks ] = useState<string>('all');

  useEffect(() => {
    if (!getToken()) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="flex flex-col gap-4 px-10 py-4">
      <BodyFiltersTasks 
        filterStatusTasks={filterStatusTasks}  
        setFilterStatusTasks={setFilterStatusTasks} 
        filterPriorityTasks={filterPriorityTasks} 
        setFilterPriorityTasks={setFilterPriorityTasks} 
      />
      <BodyTasksCategory 
        filterStatusTasks={filterStatusTasks}  
        filterPriorityTasks={filterPriorityTasks} 
      />
    </div>
  );
}

