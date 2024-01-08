import React, { useCallback } from "react";

import {
  emptyBoard,
  KanbanBoard,
  KanbanItemProps,
  KanbanItemStatus,
} from "@monorepo-frontend/kanban-board-component";
import {
  TodoItemStatus,
  useCreateTodoItemMutation,
  useListTodoItemsLazyQuery,
  useUpdateTodoItemStatusMutation,
} from "@monorepo-graphql/frontend-types";

const asKanbanItemStatus = (status: TodoItemStatus) => {
  switch (status) {
    case TodoItemStatus.Todo:
      return KanbanItemStatus.TODO;
    case TodoItemStatus.InProgress:
      return KanbanItemStatus.IN_PROGRESS;
    case TodoItemStatus.Done:
    default:
      return KanbanItemStatus.DONE;
  }
};

const asTodoItemStatus = (status: KanbanItemStatus) => {
  switch (status) {
    case KanbanItemStatus.TODO:
      return TodoItemStatus.Todo;
    case KanbanItemStatus.IN_PROGRESS:
      return TodoItemStatus.InProgress;
    case KanbanItemStatus.DONE:
      return TodoItemStatus.Done;
  }
};

const TodoKanbanBoard = () => {
  const [listTodoItems] = useListTodoItemsLazyQuery();
  const [createTodoItem] = useCreateTodoItemMutation();
  const [updateTodoItemStatus] = useUpdateTodoItemStatusMutation();

  const loadItems = useCallback(async () => {
    return listTodoItems().then((result) => {
      const items = result.data?.listTodoItems ?? [];
      return items.reduce((map, { id, description, status }) => {
        map[asKanbanItemStatus(status)].push({ id, description });
        return map;
      }, emptyBoard());
    });
  }, []);

  const onUpdateItemStatus = useCallback(
    async (input: {
      item: KanbanItemProps;
      from: KanbanItemStatus;
      to: KanbanItemStatus;
    }) => {
      updateTodoItemStatus({
        variables: {
          input: {
            itemId: input.item.id,
            fromStatus: asTodoItemStatus(input.from),
            toStatus: asTodoItemStatus(input.to),
          },
        },
      });
    },
    [],
  );

  const onAddItem = useCallback(async (status: KanbanItemStatus) => {
    return createTodoItem({
      variables: { input: { status: asTodoItemStatus(status) } },
    }).then(({ data }) => {
      const id = data?.createTodoItem.id ?? "";
      const description = data?.createTodoItem.description ?? "";
      return { id, description } as KanbanItemProps;
    });
  }, []);

  return (
    <KanbanBoard
      loadItems={loadItems}
      onAddItem={onAddItem}
      onUpdateItemStatus={onUpdateItemStatus}
    />
  );
};

export { TodoKanbanBoard };
