'use client'

import BodyTasksCategory from "@/components/page/dashboard/body_tasks";
import { getToken } from "@/api/axios/users/token";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="flex flex-col gap-4 px-10 py-4">
      <BodyTasksCategory />
    </div>
  );
}

