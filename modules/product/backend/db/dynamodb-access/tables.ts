import { IDocEntityTable } from '@labset/platform-core-backend';
import { entityNames } from '@monorepo-backend-db/api-access';

const tables: Record<entityNames, IDocEntityTable> = {
    todoItem: {
        name: `todo-item`,
        part: `GLOBAL`
    }
};

export { tables };
