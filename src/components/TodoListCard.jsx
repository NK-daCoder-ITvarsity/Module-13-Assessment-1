import { dashboardMosiacThemes } from "../constants/const";

const TodoCard = ({ task, onDelete, onEdit, theme = "blue", mosianicTheme = "" }) => {
  const themeBorders = {
    blue: "border-blue-500",
    orange: "border-orange-500",
    pink: "border-pink-500",
    green: "border-green-500",
    black: "border-stone-500",
  };

  const mosianicThemeImage = dashboardMosiacThemes.find(t => t.label === mosianicTheme)?.image;
  const isMosianic = Boolean(mosianicThemeImage);

  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-md p-4 mb-4 filter backdrop-blur-2xl ${
        isMosianic
          ? "text-white border-l-[6px] border-white/40"
          : `backdrop-blur-md filter text-gray-800 border-l-2 ${themeBorders[theme] || themeBorders.blue}`
      }`}
      style={
        isMosianic
          ? {
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3))`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      <h3 className="text-lg font-semibold">{task.name}</h3>
      <p className="text-sm mb-4">{task.description}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => onEdit(task)}
          className={`text-sm px-4 py-2 rounded-xl transition ${
            isMosianic
              ? "bg-white/20 text-white hover:bg-white/30"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className={`text-sm px-4 py-2 rounded-xl transition ${
            isMosianic
              ? "bg-red-500/80 hover:bg-red-600 text-white"
              : "bg-red-100 hover:bg-red-200 text-red-600"
          }`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export { TodoCard };
