import { Tasks } from "@/api/interfaces/tasks/list";

class TaskIterator {
    private tasks: Tasks[];
    private currentIndex: number = 0;

    constructor(tasks: Tasks[]) {
        this.tasks = tasks;
    }

    filterByCompletion(isCompleted: boolean): TaskIterator {
        this.tasks = this.tasks.filter(task => task.completed === isCompleted);
        return this;
    }

    filterByPriority(priority: string): TaskIterator {
        if (priority !== "all") {
            this.tasks = this.tasks.filter(task => task.priority === priority);
        }
        return this;
    }

    getTasks(): Tasks[] {
        return this.tasks;
    }

    next(): IteratorResult<Tasks> {
        if (this.currentIndex < this.tasks.length) {
            return {
                done: false,
                value: this.tasks[this.currentIndex++]
            };
        } else {
            return { done: true, value: null as any };
        }
    }

    [Symbol.iterator](): IterableIterator<Tasks> {
        return this;
    }
}

export default TaskIterator;