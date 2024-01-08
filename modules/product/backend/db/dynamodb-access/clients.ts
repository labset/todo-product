import {
    DynamoDbClientConfig,
    DynamoDbClients
} from '@labset/platform-backend-db';

import migrations from './migrations';

class TodoDynamoDbClients extends DynamoDbClients {
    constructor(options: DynamoDbClientConfig) {
        super(migrations, options);
    }
}

export { TodoDynamoDbClients };
