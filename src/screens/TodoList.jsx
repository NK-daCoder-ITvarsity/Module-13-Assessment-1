import React, { useEffect, useState } from 'react'
import { AddIcons } from '../constants/media'
import { TodoCard } from '../components/TodoListCard';

const themeVariables = {
  orange: "bg-gradient-to-b from-orange-500 to-red-500",
  blue: "bg-gradient-to-b from-blue-500 to-sky-800",
  pink: "bg-gradient-to-b from-pink-500 to-pink-800",
  green: "bg-gradient-to-b from-green-500 to-green-800",
  black: "bg-gradient-to-b from-stone-500 to-stone-800"
};

const TaskForm = ({ onSave, currentTask, setCurrentTask, setCurrentFormState, theme, mosianicTheme }) => {
  const [task, setTask] = useState({ name: '', description: '' });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    } else {
      setTask({ id: null, name: '', description: '' });
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.name) return;

    onSave(task);
    setTask({ name: '', description: '' });
    setCurrentTask(null);
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-5">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-10 md:w-[90%] max-w-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-y-auto">
        <section className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
            {currentTask ? 'Update Task' : 'Create a Task'}
          </h2>
          <button
            type="button"
            className={`text-sm font-medium text-white px-4 py-2 rounded-xl transition duration-200 ${theme === "black" ? themeVariables.black : theme === "green" ? themeVariables.green : theme === "blue" ? themeVariables.blue : theme === "pink" ? themeVariables.pink : theme === "orange" ? themeVariables.orange : ""}`}
          >
            + Add Task Block
          </button>
        </section>

        <section className="space-y-6">
          <fieldset className="flex flex-col">
            <label htmlFor="task-name" className="text-sm font-medium text-gray-600 mb-1">Task Name</label>
            <input
              type="text"
              id="task-name"
              required
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              className="bg-gray-100 focus:bg-white focus:ring-2 focus:ring-gray-800 focus:outline-none rounded-xl px-4 py-3 transition duration-150"
            />
          </fieldset>

          <fieldset className="flex flex-col">
            <label htmlFor="task-description" className="text-sm font-medium text-gray-600 mb-1">Description</label>
            <input
              type="text"
              id="task-description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              className="bg-gray-100 focus:bg-white focus:ring-2 focus:ring-gray-800 focus:outline-none rounded-xl px-4 py-3 transition duration-150"
            />
          </fieldset>
        </section>

        <section className="flex justify-end gap-4 mt-10">
          <button
            type="button"
            onClick={() => {
              setCurrentTask(null);
              setTask({ name: '', description: '' });
              setCurrentFormState(false);
            }}
            className="text-sm font-medium text-gray-500 hover:text-gray-800 px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="submit"
            className={`text-sm font-semibold text-white px-6 py-3 rounded-xl ${theme === "black" ? themeVariables.black : theme === "green" ? themeVariables.green : theme === "blue" ? themeVariables.blue : theme === "pink" ? themeVariables.pink : theme === "orange" ? themeVariables.orange : ""}`}
          >
            {currentTask ? 'Update' : 'Submit'}
          </button>
        </section>
      </form>
    </section>
  );
};

const TodoList = ({ theme, mosianicTheme }) => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("todo-tasks")) || []);
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('todo-tasks')) || [];
      setTasks(stored);
    } catch {
      localStorage.removeItem('todo-tasks');
      setTasks([]);
    }
  }, []);

  // setting tasks to local storage
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSave = (task) => {
    if (task.id) {
      // Update
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
    } else {
      // Create
      const newTask = { ...task, id: Date.now() };
      setTasks(prev => [...prev, newTask]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setShowForm(true);
  };

  return (
    <div className="p-4 overflow-y-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Your Tasks</h1>
        <button
          onClick={() => {
            setCurrentTask(null);
            setShowForm(true);
          }}
          className={`text-sm font-medium text-white px-4 py-2 rounded-xl ${theme === "black" ? themeVariables.black : theme === "green" ? themeVariables.green : theme === "blue" ? themeVariables.blue : theme === "pink" ? themeVariables.pink : theme === "orange" ? themeVariables.orange : ""}`}
        >
          + New Task
        </button>
      </div>
      <p className="text-sm my-2 text-stone-600">Number of task: {tasks.length}</p>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Click "New Task" to add one.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
          {
            tasks.map(task => (
              <TodoCard  mosianicTheme={mosianicTheme} theme={theme} key={task.id} task={task} onDelete={handleDelete} onEdit={handleEdit} />
            ))
          }
        </div>
      )}

      {showForm && (
        <TaskForm 
          onSave={handleSave} 
          currentTask={currentTask} 
          setCurrentTask={setCurrentTask} 
          setCurrentFormState={setShowForm} 
          theme={theme}  
        />
         
      )}
    </div>
  );
};

export { TodoList, TaskForm }