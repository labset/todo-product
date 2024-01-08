import { ApolloServer } from '@apollo/server';
import type { ApolloServerPlugin } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import type { ExpressContextFunctionArgument } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ITodoDocAccess } from '@monorepo-backend-db/api-access';
import { typeDefs } from '@monorepo-graphql/backend-types';
import {
    ITodoApolloContext,
    TodoApolloContext
} from '@monorepo-graphql/context';
import * as Mutation from '@monorepo-graphql/mutations';
import * as Query from '@monorepo-graphql/queries';
import { Express } from 'express';

interface GraphqlApiEndpointProps {
    app: Express;
    access: ITodoDocAccess;
}

const graphqlApiEndpoint = async ({ app, access }: GraphqlApiEndpointProps) => {
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers: { Query, Mutation }
    });

    const plugins = [
        ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
                'editor.reuseHeaders': true,
                'request.credentials': 'include'
            }
        }) as ApolloServerPlugin<ITodoApolloContext>
    ];

    const context = async (_: ExpressContextFunctionArgument) => {
        return new TodoApolloContext(access);
    };

    const server = new ApolloServer<ITodoApolloContext>({
        schema,
        plugins,
        introspection: true
    });
    await server.start();

    app.use(`/gateway/graphql-api`, expressMiddleware(server, { context }));
};

export { graphqlApiEndpoint };
