import React, { useState } from 'react'
import { softwarePaths } from '../constants/const.js'

const Navigation = ({updatedSection, setUpdatedSection}) => {
    
    return (
        <header className=" relative w-[15%]">
            <nav className='flex flex-col justify-between h-screen py-6 sticky top-5 border'>
                <section>
                    <a href="#" className="flex flex-col items-center justify-center">
                        <img src="/taskmate.png" alt="" className="size-12 "/>
                        <p className='text-xl font-medium text-sky-500'>Taskmate</p>
                    </a>
                    <ul className='mt-10 flex flex-col'>
                        {
                            softwarePaths.primaryPaths.map((item, index) => (
                                <li key={`primary-button-${index}`}>
                                    <button 
                                        className={
                                            `flex gap-1 items-center px-3 w-full text-sm border-r py-1
                                            ${updatedSection === item.label ? "text-sky-500 border-r-sky-500 border-r-2" : "text-stone-500"}
                                            
                                            `
                                        }
                                        onClick={() => setUpdatedSection(item.label)}
                                    >
                                        <span className={`flex items-center justify-center p-2 size-8 rounded-md ${updatedSection === item.label ? "bg-gradient-to-b from-sky-500 to-blue-500" : ""}`}>
                                            <img 
                                                src={item.icon} alt={item.label} 
                                                className={`${updatedSection === item.label ? "filter invert brightness-0 " : ""}`} 
                                                aria-hidden={true}
                                            />
                                        </span>
                                        {item.label}
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </section>
                <ul className='flex flex-col  pb-2 py-1'>
                    {
                        softwarePaths.secondaryPath.map((item, index) => (
                            <li key={`secondary-button-${index}`}>
                                <button 
                                    onClick={() => setUpdatedSection(item.label)} 
                                    className={`border-r flex gap-1 items-center px-3 py-1 w-full text-sm ${updatedSection === item.label ? "text-sky-500 border-r-sky-500 border-r-2" : "text-stone-500"}`}
                                >
                                    <span className={`flex items-center justify-center p-2 size-8 rounded-md ${updatedSection === item.label ? "bg-gradient-to-b from-sky-500 to-blue-500 " : ""}`}>
                                        <img src={item.icon} alt={item.label} className={`${updatedSection === item.label ? "filter invert brightness-0" : ""}`} aria-hidden={true}/>
                                    </span>
                                    {item.label}
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Navigation