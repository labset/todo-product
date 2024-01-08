import { TodoItemStatus } from '@monorepo-backend-db/api-access';
import { MutationResolvers } from '@monorepo-graphql/backend-types';
import Chance from 'chance';

const createTodoItem: MutationResolvers['createTodoItem'] = async (
    _,
    _input,
    ctx
) => {
    const { access } = await ctx.authenticated();
    const chance = new Chance();
    return await access.todoItem.writer.saveOne({
        description: chance.sentence(),
        status: TodoItemStatus.TODO,
        sort: chance.guid()
    });
};

export { createTodoItem };
