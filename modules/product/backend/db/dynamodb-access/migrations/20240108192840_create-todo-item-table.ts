import { CreateTableMigration } from '@labset/platform-core-backend';

import { tables } from './../tables';

class CreateTodoItemTable extends CreateTableMigration {
    constructor() {
        super(tables.todoItem);
    }
}

export { CreateTodoItemTable };
