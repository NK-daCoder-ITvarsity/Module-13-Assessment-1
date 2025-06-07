import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Header from './components/Header';
import { TodoList } from './screens/TodoList';
import KanbanBoard from './screens/KanbanBoard';
import { TasksCalender } from './screens/TaskCalander';
import MeetUp from './screens/MeetUp';
import { SettingsButtons, ThemeSettings } from './screens/Settings';
import HelpCenter from './screens/HelpCenter';
import { dashboardMosiacThemes } from './constants/const';

// Constants to avoid typo-prone strings
const SECTIONS = {
  TODO: 'Todo List',
  KANBAN: 'Kanban Board',
  CALENDAR: 'Task Calendar',
  MEETUP: 'Meet Up',
  SETTINGS: 'Settings',
  HELP: 'Help Center',
  THEMESETTINGS: 'Themes Updates'
};

const SUB_SECTIONS = {
  THEMES: 'Themes Updates',
};

const App = () => {
  const [section, setSection] = useState({ main: SECTIONS.TODO, sub: null });
  const [theme, setTheme] = useState("blue");
  const [dashTheme, setDashTheme] = useState("white");
  const [mosianicTheme, setMosianicTheme] = useState("");
  const matchedTheme = dashboardMosiacThemes.find(theme => theme.label === mosianicTheme);

  const handleSectionChange = (main) => {
    setSection({ main, sub: null }); // Reset sub-section on main change
  };

  const handleSubSectionChange = (sub) => {
    setSection(prev => ({ ...prev, sub }));
  };

  const renderContent = () => {
    const { main, sub } = section;

    if (sub === SUB_SECTIONS.THEMES) {
      return (
        <ThemeSettings 
          setTheme={setTheme}
          setDashMosianicTheme={setMosianicTheme}
          mosianicTheme={mosianicTheme}
        />
      );
    }
    

    switch (main) {
      case SECTIONS.TODO:
        return <TodoList theme={theme} mosianicTheme={mosianicTheme}/>;
      case SECTIONS.KANBAN:
        return <KanbanBoard theme={theme} mosianicTheme={mosianicTheme}/>;
      case SECTIONS.CALENDAR:
        return <TasksCalender/>
      case SECTIONS.MEETUP:
        return <MeetUp />;
      case SECTIONS.SETTINGS:
        return <SettingsButtons setThemeSettingsSection={handleSubSectionChange} />;
      case SECTIONS.HELP:
        return <HelpCenter />;
      default:
        return <div className="p-4">Select a valid section</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Navigation
        updatedSection={section.main}
        setUpdatedSection={handleSectionChange}
        theme={theme}
      />
      <section className="flex-grow">
        <Header nameOfCurrentState={section.sub || section.main} />
        {renderContent()}
      </section>

      {

        mosianicTheme !== "" && dashboardMosiacThemes.find(theme => theme.label === mosianicTheme) && (
          <img 
            src={matchedTheme.image} 
            alt="" 
            className='-z-10 fixed top-0 left-0 size-full'
          />
        )
      }

    </div>
  );
};

export default App;
