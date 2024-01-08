import {
    DocEntityAccess,
    DocEntityReadAccess,
    DocEntityWriteAccess
} from '@labset/platform-backend-db';
import { TodoItem } from '@monorepo-backend-db/api-access';

import { TodoDynamoDbClients } from './../clients';
import { tables } from './../tables';

class TodoItemEntityReadAccess extends DocEntityReadAccess<TodoItem> {
    constructor(clients: TodoDynamoDbClients) {
        super(clients.ddbDoc(), clients.ddbData(), tables.todoItem);
    }
}

class TodoItemEntityWriteAccess extends DocEntityWriteAccess<TodoItem> {
    constructor(clients: TodoDynamoDbClients) {
        super(clients.ddbDoc(), clients.ddbData(), tables.todoItem);
    }
}

class TodoItemEntityAccess extends DocEntityAccess<TodoItem> {
    constructor(clients: TodoDynamoDbClients) {
        super(
            new TodoItemEntityReadAccess(clients),
            new TodoItemEntityWriteAccess(clients)
        );
    }
}

export { TodoItemEntityAccess };
