import { IDynamoDbMigration } from '@labset/platform-core-backend';

import { CreateTodoItemTable } from './20240108192840_create-todo-item-table';

const createTodoItemTable = new CreateTodoItemTable();
const migrations: IDynamoDbMigration[] = [createTodoItemTable];

export default migrations;
