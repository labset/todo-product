import { CreateTableMigration } from '@labset/platform-backend-db';

import { tables } from './../tables';

class CreateTodoItemTable extends CreateTableMigration {
    constructor() {
        super(tables.todoItem);
    }
}

export { CreateTodoItemTable };
