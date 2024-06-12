import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Category } from "@/api/interfaces/tasks_category/list";
import { useLoading } from "@rest-hooks/hooks";
import update from "@/api/axios/tasks_category/update";
import deleteTasksCategory from "@/api/axios/tasks_category/delete";
import { UpdateTasksCategoryResponse } from "@/api/interfaces/tasks_category/update";
import { DeleteTasksCategoryResponse } from "@/api/interfaces/tasks_category/delete";
import { getToken } from "@/api/axios/users/token";

export default function TaskCategory({ category, storeCategory, setStoreCategory }: { category: Category, storeCategory: { [key: number]: Category }, setStoreCategory: (storeCategory: { [key: number]: Category }) => void }) {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [isOpen, setIsOpen] = useState(false);

  const [handleUpdateCategory, isLoadingUpdateCategory] = useLoading(async () => {
    const response: UpdateTasksCategoryResponse = await update({
      name: name,
      description: description,
    }, getToken(), category.id);

    setStoreCategory({
    ...storeCategory,
    [category.id]: { ...category, name: name, description: description }
    });

    setIsOpen(false);
  });

  const [handleDeleteCategory, isLoadingDeleteCategory] = useLoading(async () => {
    const response: DeleteTasksCategoryResponse = await deleteTasksCategory(getToken(), category.id);
    window.location.reload();
    setIsOpen(false);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <p className="text-lg font-bold">...</p> 
      </DialogTrigger>
      <DialogContent className="md:max-w-lg bg-fiord-75">
        <DialogHeader>
          <DialogTitle>Editar Categoria</DialogTitle>
          <DialogDescription>Modifique os detalhes da categoria usando os campos abaixo.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <Label htmlFor="description">Descrição</Label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="outline" >
              Fechar
            </Button>
          </DialogClose>
          <Button className="primary" variant="destructive" onClick={handleDeleteCategory}>
            {isLoadingDeleteCategory ? 'Deletando...' : 'Deletar'}
          </Button>
          <Button className="primary" onClick={handleUpdateCategory}>
            {isLoadingUpdateCategory ? 'Atualizando...' : 'Atualizar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}