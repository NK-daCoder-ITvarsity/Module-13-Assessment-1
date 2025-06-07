import { useState } from "react";
import { dashboardMosiacThemes } from "../constants/const"; // Make sure this import path is correct

const KanBanCard = ({ card, columnId, onDelete, onUpdate, onDragStart, theme = "blue", mosianicTheme = "" }) => {
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
    },
  };

  const currentTheme = themeColors[theme] || themeColors.blue;

  // Find mosianic theme image if one is active
  const mosianicThemeImage = dashboardMosiacThemes.find((t) => t.label === mosianicTheme)?.image;

  return (
    <div
      className={`p-6 rounded shadow-lg flex justify-between items-center relative overflow-hidden ${
        mosianicTheme ? "text-white" : ""
      } ${!mosianicTheme ? currentTheme.border : ""}`}
      draggable
      onDragStart={() => onDragStart(columnId, card.id)}
      style={
        mosianicTheme && mosianicThemeImage
          ? {
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderLeft: "4px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(6px)",
            }
          : {}
      }
    >
      <div className="absolute inset-0 bg-black/30 z-0 rounded pointer-events-none" />
      <div className="flex justify-between items-center w-full z-10">
        {editing ? (
          <div className="flex gap-2 w-full">
            <input
              className="border rounded p-1 w-full text-black"
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
    </div>
  );
};

export default KanBanCard;
