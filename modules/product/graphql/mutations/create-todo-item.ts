import { MutationResolvers } from '@monorepo-graphql/backend-types';
import Chance from 'chance';

const createTodoItem: MutationResolvers['createTodoItem'] = async (
    _,
    { input },
    ctx
) => {
    const { access } = await ctx.authenticated();
    const chance = new Chance();
    return await access.todoItem.writer.saveOne({
        description: chance.sentence(),
        status: input.status,
        sort: chance.guid()
    });
};

export { createTodoItem };
