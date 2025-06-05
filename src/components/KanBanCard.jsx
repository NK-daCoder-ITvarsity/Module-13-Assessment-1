import { useState } from "react";

const KanBanCard = ({ card, columnId, onDelete, onUpdate, onDragStart }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(card.text);

  const handleSave = () => {
    onUpdate(columnId, card.id, text);
    setEditing(false);
  };

  return (
    <div
      className="bg-gray-100 p-6 rounded shadow-md flex justify-between items-center border-l-2 border-sky-500"
      draggable
      onDragStart={() => onDragStart(columnId, card.id)}
    >
      {editing ? (
        <div className="flex gap-2 w-full">
          <input
            className="border rounded p-1 w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleSave} className="text-green-600">✔</button>
          <button onClick={() => setEditing(false)} className="text-red-600">✘</button>
        </div>
      ) : (
        <>
          <span className="flex-1">{card.text}</span>
          <div className="space-x-2">
            <button onClick={() => setEditing(true)} className="text-blue-600 bg-gray-100 rounded p-2 transition-transform hover:scale-105 shadow-md">✏️</button>
            <button onClick={() => onDelete(columnId, card.id)} className="text-red-600 bg-gray-100 rounded p-2 transition-transform hover:scale-105 shadow-md">🗑️</button>
          </div>
        </>
      )}
    </div>
  );
};

export default KanBanCard;
