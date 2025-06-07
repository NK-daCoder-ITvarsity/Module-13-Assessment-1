import React from 'react';
import { softwarePaths } from '../constants/const';
import { pawnIcon } from '../constants/media';

const Navigation = ({ updatedSection, setUpdatedSection, theme }) => {
  const themeColors = {
    blue: {
      text: 'text-sky-500',
      border: 'border-r border-r-sky-500',
      gradient: 'bg-gradient-to-b from-sky-500 to-blue-500',
    },
    orange: {
      text: 'text-orange-500',
      border: 'border-r border-r-orange-500',
      gradient: "bg-gradient-to-b from-orange-500 to-red-500",
    },
    pink: {
      text: 'text-pink-800',
      border: 'border-r border-r-pink-500',
      gradient: 'bg-gradient-to-b from-pink-500 to-rose-500',
    },
    green: {
      text: 'text-green-800',
      border: 'border-r border-r-green-500',
      gradient: 'bg-gradient-to-b from-green-500 to-emerald-500',
    },
    black: {
      text: 'text-stone-800',
      border: 'border-r border-r-stone-500',
      gradient: 'bg-gradient-to-b from-stone-500 to-stone-800',
    },
  };

  const currentTheme = themeColors[theme] || themeColors.blue;

  return (
    <header className="relative w-[13.7%]">
      <nav className="flex flex-col justify-between h-screen py-6 fixed top-0 left-0 border-r backdrop-blur-3xl">
        <section>
          <a href="/" className="flex flex-col items-center justify-center">
            <span className={`p-3 rounded-2xl shadow-md ${theme === "blue" ? themeColors.blue.gradient : theme === "green" ? themeColors.green.gradient : theme === "pink" ? themeColors.pink.gradient : theme === "orange" ? themeColors.orange.gradient : theme === "black" ? themeColors.black.gradient : ""}`}>
              <img src={pawnIcon} alt="Taskmate logo" className="drop-shadow size-8 brightness-0 invert filter" />
            </span>
            <p className={`text-xl font-medium ${currentTheme.text}`}>Taskmate</p>
          </a>

          <ul className="mt-10 flex flex-col">
            {softwarePaths.primaryPaths.map((item, index) => {
              const isActive = updatedSection === item.label;
              return (
                <li key={`primary-button-${index}`}>
                  <button
                    onClick={() => setUpdatedSection(item.label)}
                    className={`flex gap-1 items-center px-3 w-full text-sm py-1 
                      ${isActive ? `${currentTheme.text} ${currentTheme.border}` : 'text-stone-500'}
                    `}
                  >
                    <span
                      className={`flex items-center justify-center p-2 size-8 rounded-md 
                        ${isActive ? currentTheme.gradient : ''}
                      `}
                    >
                      <img
                        src={item.icon}
                        alt={item.label}
                        className={`${isActive ? 'filter invert brightness-0' : ''}`}
                        aria-hidden={true}
                      />
                    </span>
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <ul className="flex flex-col pb-2 py-1">
          {softwarePaths.secondaryPath.map((item, index) => {
            const isActive = updatedSection === item.label;
            return (
              <li key={`secondary-button-${index}`}>
                <button
                  onClick={() => setUpdatedSection(item.label)}
                  className={`flex gap-1 items-center px-3 py-1 w-full text-sm 
                    ${isActive ? `${currentTheme.text} ${currentTheme.border}` : 'text-stone-500'}
                  `}
                >
                  <span
                    className={`flex items-center justify-center p-2 size-8 rounded-md 
                      ${isActive ? currentTheme.gradient : ''}
                    `}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className={`${isActive ? 'filter invert brightness-0' : ''}`}
                      aria-hidden={true}
                    />
                  </span>
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
