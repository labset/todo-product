import { MutationResolvers } from '@monorepo-graphql/backend-types';

const updateTodoItemStatus: MutationResolvers['updateTodoItemStatus'] = async (
    _,
    { input },
    ctx
) => {
    const { access } = await ctx.authenticated();
    const [, sort] = input.itemId.split('---');
    const found = await access.todoItem.reader.findBySort({ sort });
    if (found === null) {
        throw Error('item not found');
    }

    return await access.todoItem.writer.saveOne({
        ...found,
        status: input.toStatus
    });
};

export { updateTodoItemStatus };
