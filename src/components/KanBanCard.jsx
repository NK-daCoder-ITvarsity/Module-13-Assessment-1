import { useState } from "react";

const KanBanCard = ({ card, columnId, onDelete, onUpdate, onDragStart, theme = "blue" }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(card.text);

  const handleSave = () => {
    onUpdate(columnId, card.id, text);
    setEditing(false);
  };

  const themeColors = {
    blue: {
      border: "border-l-2 border-sky-500",
      icon: "text-blue-600",
    },
    orange: {
      border: "border-l-2 border-orange-500",
      icon: "text-orange-600",
    },
    pink: {
      border: "border-l-2 border-pink-500",
      icon: "text-pink-600",
    },
    green: {
      border: "border-l-2 border-green-500",
      icon: "text-green-600",
    },
    black: {
      border: "border-l-2 border-stone-500",
      icon: "text-stone-600",
    }
  };

  const currentTheme = themeColors[theme] || themeColors.blue;

  return (
    <div
      className={`p-6 rounded shadow-md flex justify-between items-center ${currentTheme.border}`}
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
            <button
              onClick={() => setEditing(true)}
              className={`${currentTheme.icon} rounded p-2 transition-transform hover:scale-105 shadow-md`}
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(columnId, card.id)}
              className="text-red-600 rounded p-2 transition-transform hover:scale-105 shadow-md"
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default KanBanCard;
