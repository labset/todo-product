import { DocEntity } from "@labset/platform-core-backend";

enum TodoItemStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

interface TodoItem extends DocEntity {
    status: TodoItemStatus;
    description: string;
}

export type { TodoItem };
export { TodoItemStatus };
