import { QueryResolvers } from '@monorepo-graphql/backend-types';

const listTodoItems: QueryResolvers['listTodoItems'] = async (
    _,
    _input,
    ctx
) => {
    const { access } = await ctx.authenticated();
    return access.todoItem.reader.query({});
};

export { listTodoItems };
