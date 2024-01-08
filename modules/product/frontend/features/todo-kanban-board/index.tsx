import React, { useCallback } from "react";

import {
  emptyBoard,
  KanbanBoard,
  KanbanItemProps,
  KanbanItemStatus,
} from "@monorepo-frontend/kanban-board-component";
import {
  TodoItemStatus,
  useListTodoItemsLazyQuery,
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

const TodoKanbanBoard = () => {
  const [listTodoItems] = useListTodoItemsLazyQuery();

  const loadItems = useCallback(async () => {
    return listTodoItems().then((result) => {
      const items = result.data?.listTodoItems ?? [];
      return items.reduce((map, { id, description, status }) => {
        map[asKanbanItemStatus(status)].push({ id, description });
        return map;
      }, emptyBoard());
    });
  }, []);

  const updateItemStatus = useCallback(
    async (props: {
      item: KanbanItemProps;
      from: KanbanItemStatus;
      to: KanbanItemStatus;
    }) => {
      console.info("** update: ", props);
    },
    [],
  );

  return (
    <KanbanBoard loadItems={loadItems} updateItemStatus={updateItemStatus} />
  );
};

export { TodoKanbanBoard };
