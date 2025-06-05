
import { useState } from "react";
import KanBanCard from "./kanBanCard";

const Column = ({ column, onAdd, onDelete, onUpdate, onDragStart, onDrop }) => {
  const [input, setInput] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop(column.id);
  };

  return (
    <div
      className="bg-white p-4 rounded shadow w-80"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 className="font-semibold text-medium mb-4">{column.title}</h2>

      <div className="space-y-2 min-h-[100px]">
        {column.cards.map((card) => (
          <KanBanCard
            key={card.id}
            card={card}
            columnId={column.id}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onDragStart={onDragStart}
          />
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="border p-2 rounded w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task..."
        />
        <button
          onClick={() => {
            onAdd(column.id, input);
            setInput("");
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Column;
