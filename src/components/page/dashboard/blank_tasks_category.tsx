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
import { useState } from "react";
import { useLoading } from "@rest-hooks/hooks";
import create from "@/api/axios/tasks_category/create";
import { CreateTasksCategoryResponse } from "@/api/interfaces/tasks_category/create";
import { getToken } from "@/api/axios/users/token";
import { Category } from "@/api/interfaces/tasks_category/list";

export default function BlankTasksCategory() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [handleCreateTaskCategory, isLoadingCreateTaskCategory] = useLoading(async () => {
    const response: CreateTasksCategoryResponse = await create({
      name: name,
      description: description,
    }, getToken());

    window.location.reload()

    setIsOpen(false);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="bg-fiord-75 rounded-lg border shadow-md min-w-64 w-64 h-14 flex items-center justify-center cursor-pointer">
        <p className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Adicionar uma Categoria
        </p>  
      </DialogTrigger>
      <DialogContent className="md:max-w-lg bg-fiord-75">
        <DialogHeader>
          <DialogTitle>Adicionar Categoria</DialogTitle>
          <DialogDescription>
            Clique no botão abaixo para adicionar uma categoria.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <form className="space-y-2">
              <Label htmlFor="name" className="sr-only">
                Nome da Categoria
              </Label>
              <Input
                id="name"
                placeholder="Nome da Categoria"
                onChange={(e) => setName(e.target.value)}
              />
              <Label htmlFor="description" className="sr-only">
                Descrição da Categoria
              </Label>
              <Input
                id="description"
                placeholder="Descrição da Categoria"
                onChange={(e) => setDescription(e.target.value)}
              />
            </form>
        </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Fechar
            </Button>
          </DialogClose>
          <Button onClick={handleCreateTaskCategory} className="primary">
            {isLoadingCreateTaskCategory ? 'Adicionando...' : 'Adicionar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

