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
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });
  
  const [selectedDay, setSelectedDay] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [filter, setFilter] = useState("all");

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const getDaysInMonth = () =>
    eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });

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
        { id: Date.now(), text: newTask.trim(), status: "pending" },
      ],
    }));
    setNewTask("");
  };

  const handleStatusToggle = (dayStr, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [dayStr]: prev[dayStr].map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
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
    <div className="w-[57rem] mt-5 p-6 mx-auto font-sans backdrop-blur-2xl border-t border-stone-200 filter rounded-3xl shadow-xl">
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          ← Previous
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">
          {format(currentMonth, "MMMM yyyy")}
        </h1>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="text-sm px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          Next →
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-4">
        <label className="text-gray-700 font-medium">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-full border border-gray-300 px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All</option>
          <option value="completed">✅ Completed</option>
          <option value="pending">⏳ Pending</option>
          <option value="not_completed">❌ Not Completed</option>
        </select>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {daysInMonth.map((day) => {
          const dayStr = formatDate(day);
          const allDayTasks = tasks[dayStr] || [];
          const visibleTasks = allDayTasks.filter((t) => filterTask(dayStr, t));

          return (
            <div
              key={dayStr}
              onClick={() => setSelectedDay(dayStr)}
              className={`p-3 rounded-2xl border transition cursor-pointer ${
                isToday(day) ? "bg-blue-100 border-blue-300" : "hover:bg-gray-50"
              }`}
            >
              <div className="text-gray-700 font-bold">{format(day, "d")}</div>
              <ul className="text-sm mt-2 space-y-1">
                {visibleTasks.map((task) => (
                  <li key={task.id} className="truncate flex items-center gap-1">
                    <span>{getStatus(dayStr, task)}</span>
                    <span className="text-gray-600">{task.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Task Section */}
      {selectedDay && isSameMonth(parseISO(selectedDay), currentMonth) && (
        <div className="mt-10 pt-6 border-t">
          <h2 className="text-lg font-semibold mb-4">
            Tasks for <span className="text-blue-600">{selectedDay}</span>
          </h2>
          <ul className="space-y-3 mb-4">
            {(tasks[selectedDay] || []).map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border shadow-sm"
              >
                <span className="text-gray-700">
                  {getStatus(selectedDay, task)} {task.text}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusToggle(selectedDay, task.id)}
                    className="text-xs px-3 py-1 rounded-full bg-green-100 hover:bg-green-200 text-green-800 transition"
                  >
                    {task.status === "completed" ? "Mark Pending" : "Complete"}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedDay, task.id)}
                    className="text-xs px-3 py-1 rounded-full bg-red-100 hover:bg-red-200 text-red-800 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="New task"
            />
            <button
              onClick={handleAddTask}
              className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-full transition shadow"
            >
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { TasksCalender };
