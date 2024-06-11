'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { useLoading } from "@rest-hooks/hooks";
import create from "@/api/axios/tasks/create";
import { CreateTasksResponse } from "@/api/interfaces/tasks/create";
import { getToken } from "@/api/axios/users/token";

export default function BlankTasksCategory({ task_category_id }: { task_category_id: number }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date().toISOString());
  const [priority, setPriority] = useState('low');
  const [isOpen, setIsOpen] = useState(false);

  const [handleCreateTask, isLoadingCreateTask] = useLoading(async () => {
    console.log({
      title: title,
      description: description,
      deadline: deadline,
      priority: priority,
      user: Number(localStorage.getItem('user_id')),
      task_category: task_category_id,
    })

    const response: CreateTasksResponse = await create({
      title: title,
      description: description,
      deadline: deadline,
      priority: priority,
      user: Number(localStorage.getItem('user_id')),
      task_category: task_category_id,
    }, getToken());

    console.log(response);

    setIsOpen(false);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="bg-fiord-75 rounded-lg border shadow-md w-64 h-14 flex items-center justify-center cursor-pointer">
        <p className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Adicionar Tarefa
        </p>  
      </DialogTrigger>
      <DialogContent className="md:max-w-lg bg-fiord-75">
        <DialogHeader>
          <DialogTitle>Adicionar Tarefa</DialogTitle>
          <DialogDescription>
            Clique no botão abaixo para adicionar uma tarefa.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <form className="space-y-2">
              <Label htmlFor="title" className="sr-only">
                Nome da Tarefa
              </Label>
              <Input
                id="title"
                placeholder="Título da Tarefa"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Label htmlFor="description" className="sr-only">
                Descrição da Tarefa
              </Label>
              <Input
                id="description"
                placeholder="Descrição da Tarefa"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Label htmlFor="deadline" className="sr-only">
                Prazo da Tarefa
              </Label>
              <Input
                id="deadline"
                type="datetime-local"
                placeholder="Prazo da Tarefa"
                defaultValue={deadline}
                onChange={(e) => setDeadline(new Date(e.target.value).toISOString())}
              />
              <Label htmlFor="priority" className="sr-only">
                Prioridade da Tarefa
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent className="bg-fiord-75">
                  <SelectItem value="alta" onClick={() => setPriority('high')}>Alta</SelectItem>
                  <SelectItem value="media" onClick={() => setPriority('medium')}>Média</SelectItem>
                  <SelectItem value="baixa" onClick={() => setPriority('low')}>Baixa</SelectItem>
                </SelectContent>
              </Select>
            </form>
        </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Fechar
            </Button>
          </DialogClose>
          <Button onClick={handleCreateTask} className="primary">
            {isLoadingCreateTask ? 'Adicionando...' : 'Adicionar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

