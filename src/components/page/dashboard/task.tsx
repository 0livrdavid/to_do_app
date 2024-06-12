'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLoading } from "@rest-hooks/hooks";
import update from "@/api/axios/tasks/update";
import deleteTasks from "@/api/axios/tasks/delete";
import type { UpdateTasksResponse } from "@/api/interfaces/tasks/update";
import type { DeleteTasksResponse } from "@/api/interfaces/tasks/delete";
import { useState } from "react";
import { Tasks } from "@/api/interfaces/tasks/list";
import { getToken } from "@/api/axios/users/token";

export default function Task ({ taskData, task_category_id }: { taskData: Tasks, task_category_id: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(taskData.title);
    const [description, setDescription] = useState(taskData.description);
    const [deadline, setDeadline] = useState(taskData.deadline);
    const [priority, setPriority] = useState(taskData.priority);
    const [completed, setCompleted] = useState(taskData.completed);
    
    const [handleUpdateTask, isLoadingUpdateTask] = useLoading(async () => {
        const response: UpdateTasksResponse = await update({
            title: title,
            description: description,
            deadline: deadline,
            priority: priority,
            completed: completed,
            user: Number(localStorage.getItem('user_id')),
            task_category: task_category_id,
        }, getToken(), taskData.id);

        window.location.reload()
        setIsOpen(false);
    });

    const [handleDeleteTask, isLoadingDeleteTask] = useLoading(async () => {
        const response: DeleteTasksResponse = await deleteTasks(getToken(), taskData.id);
        window.location.reload()
        setIsOpen(false);
    });

    return (
        <Dialog key={taskData.id} open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild className="text-fiord-50 bg-fiord-500 w-full border border-fiord-600 rounded-md p-4 hover:bg-fiord-300 hover:text-fiord-800">
                <p className="flex items-center gap-2 ">
                    <span>{taskData.title}</span>
                    {taskData.completed && (
                        <span className="flex items-center hover:text-green-700">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </span>
                    )}
                </p>  
            </DialogTrigger>
            <DialogContent className="md:max-w-lg bg-fiord-75">
            <DialogHeader>
                <DialogTitle>Editar Tarefa</DialogTitle>
                <DialogDescription>
                Clique no botão abaixo para editar uma tarefa.
                </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                <form className="space-y-2">
                    <Label htmlFor="name" className="sr-only">
                    Nome da Tarefa
                    </Label>
                    <Input
                    id="name"
                    placeholder="Nome da Tarefa"
                    defaultValue={taskData.title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <Label htmlFor="description" className="sr-only">
                    Descrição da Tarefa
                    </Label>
                    <Input
                    id="description"
                    type="text"
                    defaultValue={taskData.description}
                    placeholder="Descrição da Tarefa"
                    onChange={(e) => setDescription(e.target.value)}
                    />
                    <Label htmlFor="deadline" className="sr-only">
                    Prazo da Tarefa
                    </Label>
                    <Input
                    id="deadline"
                    type="datetime-local"
                    defaultValue={new Date(taskData.deadline).toISOString().slice(0, 16)}
                    placeholder="Prazo da Tarefa"
                    onChange={(e) => setDeadline(e.target.value)}
                    />
                <Label htmlFor="priority" className="sr-only">
                    Prioridade da Tarefa
                </Label>
                <Select defaultValue={taskData.priority} onValueChange={setPriority}>
                    <SelectTrigger>
                        <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent className="bg-fiord-75">
                        <SelectItem value="high">Alta</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="low">Baixa</SelectItem>
                    </SelectContent>
                </Select>
                <Select defaultValue={taskData.completed ? 'true' : 'false'} onValueChange={(value) => setCompleted(value === 'true')}>
                    <SelectTrigger>
                        <SelectValue placeholder="Está concluída?" />
                    </SelectTrigger>
                    <SelectContent className="bg-fiord-75">
                        <SelectItem value="true">Completo</SelectItem>
                        <SelectItem value="false">Incompleto</SelectItem>
                    </SelectContent>
                </Select>
                </form>
            </div>
            </div>
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                <Button type="button" variant="outline">
                    Fechar
                </Button>
                </DialogClose>

                <Button className="primary" variant="destructive" onClick={handleDeleteTask}>
                    {isLoadingDeleteTask ? 'Deletando...' : 'Deletar'}
                </Button>
                <Button className="primary" onClick={handleUpdateTask}>
                    {isLoadingUpdateTask ? 'Atualizando...' : 'Atualizar'}
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}