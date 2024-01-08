import { ITodoDocAccess } from '@monorepo-backend-db/api-access';

import { TodoDynamoDbClients } from './../clients';
import { TodoItemEntityAccess } from './todo-item-entity-access';

const todoDocAccess = (clients: TodoDynamoDbClients): ITodoDocAccess => {
    return {
        todoItem: new TodoItemEntityAccess(clients)
    };
};

export { todoDocAccess };
