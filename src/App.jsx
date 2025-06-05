import React, { useState } from 'react'
import Navigation from './components/Navigation'
import Header from './components/Header';
import { TodoList } from './screens/TodoList';
import KanbanBoard from "./screens/KanbanBoard";
import TaskCalander from "./screens/TaskCalander";
import MeetUp from "./screens/MeetUp";
import Settings from "./screens/Settings";
import HelpCenter from "./screens/HelpCenter";
import { AddIcons } from './constants/media';

const App = () => {
  const [section, setSection] = useState("Todo List");
  
  return (
    <div className='flex'>
      <Navigation
        updatedSection={section}
        setUpdatedSection={setSection}
      />
      <section className='flex-grow overflow-y-auto'>
        {/* ------------------ Render components here ------------------ */}
        <Header
          nameOfCurrentState={section}
        />
        {
          section === "Todo List" ? <TodoList /> :
          section === "Kanban Board" ? <KanbanBoard /> :
          section === "Task Calander" ? <TaskCalander /> :
          section === "Meet Up" ? <MeetUp/> :
          section === "Settings" ? <Settings/> :
          section === "Help Center" ? <HelpCenter/> : null
        }
      </section>
    </div>
  )
}

export default App