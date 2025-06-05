import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Column from "../components/KanBanColumn";

const initialData = {
  todo: { id: "todo", title: "To Do", cards: [] },
  inprogress: { id: "inprogress", title: "In Progress", cards: [] },
  done: { id: "done", title: "Done", cards: [] },
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialData);
  const [dragged, setDragged] = useState(null);

  const handleAdd = (columnId, text) => {
    const newCard = { id: uuidv4(), text };
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        cards: [...prev[columnId].cards, newCard],
      },
    }));
  };

  const handleDelete = (columnId, cardId) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        cards: prev[columnId].cards.filter(card => card.id !== cardId),
      },
    }));
  };

  const handleUpdate = (columnId, cardId, newText) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        cards: prev[columnId].cards.map(card =>
          card.id === cardId ? { ...card, text: newText } : card
        ),
      },
    }));
  };

  const handleDragStart = (columnId, cardId) => {
    setDragged({ columnId, cardId });
  };

  const handleDrop = (targetColumnId) => {
    if (!dragged) return;
    const { columnId: fromCol, cardId } = dragged;
    if (fromCol === targetColumnId) return;

    const draggedCard = columns[fromCol].cards.find(card => card.id === cardId);
    setColumns(prev => ({
      ...prev,
      [fromCol]: {
        ...prev[fromCol],
        cards: prev[fromCol].cards.filter(card => card.id !== cardId),
      },
      [targetColumnId]: {
        ...prev[targetColumnId],
        cards: [...prev[targetColumnId].cards, draggedCard],
      },
    }));

    setDragged(null);
  };

  return (
    <div className="flex gap-4 p-4">
      {Object.entries(columns).map(([columnId, column]) => (
        <Column
          key={columnId}
          column={column}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
