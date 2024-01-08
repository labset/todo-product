import { IDocEntityAccess } from '@labset/platform-backend-db';

import { TodoItem } from './entities';

interface ITodoDocAccess {
    todoItem: IDocEntityAccess<TodoItem>;
}

type entityNames = keyof ITodoDocAccess;
export type { ITodoDocAccess, entityNames };
