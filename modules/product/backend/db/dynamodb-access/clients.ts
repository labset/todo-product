import {
    DynamoDbClientConfig,
    DynamoDbClients
} from '@labset/platform-core-backend';

import migrations from './migrations';

class TodoDynamoDbClients extends DynamoDbClients {
    constructor(options: DynamoDbClientConfig) {
        super(migrations, options);
    }
}

export { TodoDynamoDbClients };
