import React, { useState, useEffect } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isBefore,
  isToday,
  parseISO,
  addMonths,
  subMonths,
  isSameMonth,
} from "date-fns";

const LOCAL_STORAGE_KEY = "task-calendar-data";

const TasksCalender = () => {
  const [tasks, setTasks] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const getDaysInMonth = () => {
    return eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });
  };

  const formatDate = (date) => format(date, "yyyy-MM-dd");

  const getStatus = (dayStr, task) => {
    const taskDate = parseISO(dayStr);
    if (task.status === "completed") return "✅";
    if (isBefore(taskDate, new Date()) && task.status !== "completed") return "❌";
    return "⏳";
  };

  const filterTask = (dayStr, task) => {
    const status = getStatus(dayStr, task);
    if (filter === "all") return true;
    if (filter === "completed" && status === "✅") return true;
    if (filter === "pending" && status === "⏳") return true;
    if (filter === "not_completed" && status === "❌") return true;
    return false;
  };

  const handleAddTask = () => {
    if (!selectedDay || !newTask.trim()) return;
    setTasks((prev) => ({
      ...prev,
      [selectedDay]: [
        ...(prev[selectedDay] || []),
        { id: Date.now(), text: newTask, status: "pending" },
      ],
    }));
    setNewTask("");
  };

  const handleStatusToggle = (dayStr, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [dayStr]: prev[dayStr].map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      ),
    }));
  };

  const handleDelete = (dayStr, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [dayStr]: prev[dayStr].filter((task) => task.id !== taskId),
    }));
  };

  const daysInMonth = getDaysInMonth();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Prev
        </button>
        <h1 className="text-xl font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </h1>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next →
        </button>
      </div>

      <div className="mb-4">
        <label className="font-medium mr-2">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="completed">✅ Completed</option>
          <option value="pending">⏳ Pending</option>
          <option value="not_completed">❌ Not Completed</option>
        </select>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((day) => {
          const dayStr = formatDate(day);
          const allDayTasks = tasks[dayStr] || [];
          const visibleTasks = allDayTasks.filter((t) =>
            filterTask(dayStr, t)
          );

          return (
            <div
              key={dayStr}
              onClick={() => setSelectedDay(dayStr)}
              className={`border p-2 rounded-md cursor-pointer hover:bg-blue-100 ${
                isToday(day) ? "bg-blue-200" : ""
              }`}
            >
              <div className="font-semibold">{format(day, "d")}</div>
              <ul className="text-sm mt-1 space-y-1">
                {visibleTasks.map((task) => (
                  <li
                    key={task.id}
                    className="truncate flex items-center gap-1"
                  >
                    <span>{getStatus(dayStr, task)}</span>
                    <span>{task.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {selectedDay && isSameMonth(parseISO(selectedDay), currentMonth) && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-bold">
            Tasks for {selectedDay}
          </h2>
          <ul className="space-y-2 mb-2">
            {(tasks[selectedDay] || []).map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>{getStatus(selectedDay, task)} {task.text}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleStatusToggle(selectedDay, task.id)
                    }
                    className="px-2 py-1 text-xs bg-green-200 text-green-500 rounded-full hover:bg-green-600 hover:text-white shadow-md"
                  >
                    {task.status === "completed"
                      ? "Mark Pending"
                      : "Complete"}
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(selectedDay, task.id)
                    }
                    className="px-2 py-1 text-xs bg-red-200 text-red-500 rounded-full hover:bg-red-600 hover:text-white shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 border rounded px-2 py-1"
              placeholder="New task"
            />
            <button
              onClick={handleAddTask}
              className="px-3 text-sm  bg-gradient-to-b from-sky-500 to-sky-700 text-white rounded-full shadow-md"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { TasksCalender }
