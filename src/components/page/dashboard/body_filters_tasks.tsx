import { Button } from "@/components/ui/button"

export default function BodyFiltersTasks(
    { 
        filterStatusTasks, setFilterStatusTasks, filterPriorityTasks, setFilterPriorityTasks }: 
    { 
        filterStatusTasks: boolean, 
        setFilterStatusTasks: (filterStatusTasks: boolean) => void, 
        filterPriorityTasks: string, 
        setFilterPriorityTasks: (filterPriorityTasks: string) => void 
    }) {
    return (
        <div className="flex justify-between items-center gap-8">
            <div className="flex gap-2">
                <Button variant={!filterStatusTasks ? "default" : "outline"} onClick={() => setFilterStatusTasks(false)}>Pendentes</Button>
                <Button variant={filterStatusTasks ? "default" : "outline"} onClick={() => setFilterStatusTasks(true)}>Concluídas</Button>
            </div>
            <div className="flex gap-2">
                <Button variant={filterPriorityTasks === "all" ? "default" : "outline"} onClick={() => setFilterPriorityTasks("all")}>Todas</Button>
                <Button variant={filterPriorityTasks === "high" ? "default" : "outline"} onClick={() => setFilterPriorityTasks("high")}>Alta</Button>
                <Button variant={filterPriorityTasks === "medium" ? "default" : "outline"} onClick={() => setFilterPriorityTasks("medium")}>Média</Button>
                <Button variant={filterPriorityTasks === "low" ? "default" : "outline"} onClick={() => setFilterPriorityTasks("low")}>Baixa</Button>
            </div>
        </div>
    )
}