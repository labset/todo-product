import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import AddIcon from "@mui/icons-material/Add";
import { Box, Chip, Divider, Grid, IconButton, Paper } from "@mui/material";

import { KanbanItem, KanbanItemProps, KanbanItemStatus } from "./kanban-item";

interface KanbanListProps {
  status: KanbanItemStatus;
  items: KanbanItemProps[];
}

const KanbanListStatus = ({ status }: Pick<KanbanListProps, "status">) => {
  switch (status) {
    case KanbanItemStatus.TODO:
      return <Chip color="error" label={status} size="small" />;
    case KanbanItemStatus.IN_PROGRESS:
      return <Chip color="warning" label={status} size="small" />;
    case KanbanItemStatus.DONE:
    default:
      return <Chip color="success" label={status} size="small" />;
  }
};

const DraggableListItem = ({
  index,
  item,
}: {
  index: number;
  item: KanbanItemProps;
}) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <Grid
          item
          ref={provided.innerRef}
          sx={{ marginTop: 2 }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <KanbanItem item={item} />
        </Grid>
      )}
    </Draggable>
  );
};

const DroppableList = ({ status, items }: KanbanListProps) => {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <Box ref={provided.innerRef} {...provided.droppableProps}>
          {items.map((item, index) => (
            <DraggableListItem key={item.id} index={index} item={item} />
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

const KanbanList = ({ status, items }: KanbanListProps) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Box display="flex">
        <KanbanListStatus status={status} />
        <IconButton size="small" sx={{ marginLeft: "auto" }}>
          <AddIcon />
        </IconButton>
      </Box>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <DroppableList status={status} items={items} />
    </Paper>
  );
};

export { KanbanList };
