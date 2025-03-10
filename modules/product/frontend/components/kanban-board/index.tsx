import React, { useEffect, useState } from "react";
import type { DropResult } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";

import { Grid } from "@mui/material";

import { KanbanItemProps, KanbanItemStatus } from "./kanban-item";
import { KanbanList } from "./kanban-list";

interface KanbanBoardProps {
  loadItems: () => Promise<Record<KanbanItemStatus, KanbanItemProps[]>>;
  onAddItem: (status: KanbanItemStatus) => Promise<KanbanItemProps>;
  onUpdateItemStatus: (input: {
    item: KanbanItemProps;
    from: KanbanItemStatus;
    to: KanbanItemStatus;
  }) => Promise<void>;
}

const emptyBoard = (): Record<KanbanItemStatus, KanbanItemProps[]> => {
  return {
    [KanbanItemStatus.TODO]: [],
    [KanbanItemStatus.IN_PROGRESS]: [],
    [KanbanItemStatus.DONE]: [],
  };
};

const KanbanBoard = ({
  loadItems,
  onUpdateItemStatus,
  onAddItem,
}: KanbanBoardProps) => {
  const [items, setItems] =
    useState<Record<KanbanItemStatus, KanbanItemProps[]>>(emptyBoard());

  useEffect(() => {
    loadItems().then((items) => {
      setItems(items);
    });
  }, []);

  const asStatus = (kind: string) => {
    return kind as KanbanItemStatus;
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const sourceStatus = asStatus(result.source.droppableId);
    const destinationStatus = asStatus(result.destination.droppableId);

    const source = items[sourceStatus];
    const destination = items[destinationStatus];
    const [removedFromSource] = source.splice(result.source.index, 1);
    destination.splice(result.destination.index, 0, removedFromSource);
    await onUpdateItemStatus({
      item: removedFromSource,
      from: sourceStatus,
      to: destinationStatus,
    });
  };

  const onAddItemToList = async (status: KanbanItemStatus) => {
    onAddItem(status).then((item) => {
      items[status].push(item);
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <KanbanList
            status={KanbanItemStatus.TODO}
            items={items[KanbanItemStatus.TODO]}
            onAddItem={() => onAddItemToList(KanbanItemStatus.TODO)}
          />
        </Grid>
        <Grid item xs={3}>
          <KanbanList
            status={KanbanItemStatus.IN_PROGRESS}
            items={items[KanbanItemStatus.IN_PROGRESS]}
            onAddItem={() => onAddItemToList(KanbanItemStatus.IN_PROGRESS)}
          />
        </Grid>
        <Grid item xs={3}>
          <KanbanList
            status={KanbanItemStatus.DONE}
            items={items[KanbanItemStatus.DONE]}
            onAddItem={() => onAddItemToList(KanbanItemStatus.DONE)}
          />
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

export { KanbanBoard, KanbanItemStatus, emptyBoard };
export type { KanbanBoardProps, KanbanItemProps };
