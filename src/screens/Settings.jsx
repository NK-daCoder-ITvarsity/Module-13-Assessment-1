import React, { useState } from 'react'
import { themeIcon } from '../constants/media'
import { dashboardMosiacThemes, dashboardThemes, themes } from '../constants/const'

const SettingsButtons = ({setThemeSettingsSection}) => {
  return (
    <React.Fragment>
      <ul className='mt-5 h-full p-4'>
        <li>
          <button type="button" onClick={() => setThemeSettingsSection("Themes Updates")}>
            <div className="flex items-center gap-2 rounded-3xl p-8 shadow-md hover:scale-105 transition-transform transform">
              <img src={themeIcon} alt="" className="size-11"/>
              <div className="flex flex-col gap-1 flex-start">
                <p className="text-stone-800 font-medium text-left">Theme Customize</p>
                <p className='text-stone-600 text-sm'>Customize your Taksmate dashboard theme</p>
              </div>
            </div>
          </button>
        </li>
      </ul>
    </React.Fragment>
  )
}

const ThemeSettings = ({ setTheme, setDashMosianicTheme, mosianicTheme = false }) => {

  const [mosianicToggle, setMosianicToggle] = useState(false);

  const themeVariables = {
    orange: "bg-gradient-to-b from-orange-500 to-red-500",
    blue: "bg-gradient-to-b from-blue-500 to-sky-800",
    pink: "bg-gradient-to-b from-pink-500 to-pink-800",
    green: "bg-gradient-to-b from-green-500 to-green-800",
    black: "bg-gradient-to-b from-stone-500 to-stone-800",
    white: "bg-white"
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className=" flex flex-col gap-3 border rounded-3xl p-4 shadow-sm backdrop-blur-lg filter">
        <h2 className="font-semibold text-lg">Button Themes</h2>
        <ul className="flex flex-wrap gap-4">
          {themes.map((theme) => (
            <li key={`theme-${theme}`}>
              <button
                type="button"
                onClick={() => setTheme(theme)}
                className="flex flex-col items-center gap-1"
              >
                <span
                  className={`rounded-full size-6 shadow-md ${themeVariables[theme]}`}
                ></span>
                <span className="text-sm capitalize text-gray-700">{theme}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3 border rounded-3xl p-4 shadow-sm backdrop-blur-xl filter">
        <h2 className="font-semibold text-lg">Dashborad Themes</h2>
        <ul className="flex gap-4">
          {
            dashboardThemes.map((theme) => (
              <li key={`theme-${theme}`}>
              <button
                type="button"
                onClick={() => {
                  mosianicTheme = false;
                }}
                className="flex flex-col items-center gap-1"
              >
                <span
                  className={`rounded-full size-6 shadow-md ${themeVariables[theme]}`}
                ></span>
                <span className="text-sm capitalize text-gray-700">{theme}</span>
              </button>
            </li>
            ))
          }
        </ul>
        <div className="flex justify-between items-center">
          <h3 className="text-sm text-stone-500 mt-2 font-medium">Mosianic Theme</h3>
          <button 
            onClick={() => setMosianicToggle(!mosianicToggle)}
            className={`flex items-center transition-all ${mosianicToggle ? "justify-end bg-sky-500" : "justify-start bg-stone-200" } relative h-6 border w-[3rem] rounded-full  py-2 px-1 shadow-inner`}
          >
            <span className={`size-4 rounded-full bg-stone-50 shadow-md`}></span>
          </button>
        </div>
        {
          mosianicToggle && (
            <ul className='flex gap-5 flex-wrap'>
              {
                dashboardMosiacThemes.map((theme) => (
                  <li key={`mosianic-theme-${theme.label}`}>
                    <button
                      type="button"
                      onClick={() => setDashMosianicTheme(theme.label) }
                    >
                        <img src={theme.image} alt="" className='w-[2.5rem] rounded'/>
                        <span className='text-sm text-stone-600'>{theme.label}</span>
                    </button>
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
    </div>
  );
};

export { SettingsButtons, ThemeSettings }