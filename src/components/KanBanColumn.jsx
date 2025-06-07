
import { useState } from "react";
import KanBanCard from "./kanBanCard";

const themeVariables = {
  orange: "bg-gradient-to-b from-orange-500 to-red-500",
  blue: "bg-gradient-to-b from-blue-500 to-sky-800",
  pink: "bg-gradient-to-b from-pink-500 to-pink-800",
  green: "bg-gradient-to-b from-green-500 to-green-800",
  black: "bg-gradient-to-b from-stone-500 to-stone-800"
};

const Column = ({ column, onAdd, onDelete, onUpdate, onDragStart, onDrop, theme }) => {
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
            theme={theme}
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
          className={`text-white px-3 py-1 rounded ${theme === "black" ? themeVariables.black : theme === "orange" ? themeVariables.orange : theme === "blue" ? themeVariables.blue : theme === "green" ? themeVariables.green : theme === "pink" ? themeVariables.pink : ""}`}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Column;
