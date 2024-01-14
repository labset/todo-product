import path from 'path';

import { localstackDynamoDbClientConfig } from '@labset/platform-core-backend';
import { todoConfig } from '@monorepo-backend/config';
import { withCors } from '@monorepo-backend/middlewares';
import {
    TodoDynamoDbClients,
    todoDocAccess
} from '@monorepo-backend-db/dynamodb-access';
import { graphqlApiEndpoint } from '@monorepo-backend-endpoints/graphql-api';
import dotenv from 'dotenv';
import express, { Express, json } from 'express';

interface WithExpressApp {
    app: Express;
}

const createExpressApp = async (): Promise<WithExpressApp> => {
    const app = express();
    app.use(json());
    console.info('\n▶️ [monorepo-harness] created express app');
    return { app };
};

const configureProduct = async ({ app }: WithExpressApp) => {
    withCors({
        app,
        product: {
            baseUrl: todoConfig.BASE_URL,
            gatewayUrl: todoConfig.GATEWAY_URL
        }
    });
    const clients = new TodoDynamoDbClients(localstackDynamoDbClientConfig);
    await clients.upgrade();
    const access = todoDocAccess(clients);
    await graphqlApiEndpoint({ app, access });
    return { app };
};

const startExpressApp = async ({ app }: WithExpressApp) => {
    const port = 4000;
    const server = app.listen(port, () => {
        console.info(
            `⚡️ [monorepo-harness] express app ready at http://localhost:${port}`
        );
    });
    const shutdown = () => {
        console.info('\n🛑 [monorepo-harness] shutdown');
        server.close();
    };
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
};

dotenv.config({ path: path.resolve(__dirname, '.env.localstack') });
createExpressApp()
    .then(configureProduct)
    .then(startExpressApp)
    .catch(console.error);
