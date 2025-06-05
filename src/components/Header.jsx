import React from 'react'

const Header = ({nameOfCurrentState, renderElements}) => {
  return (
    <section className={`p-5 border-b flex justify-between items-center h-20`}>
        <h1 className="font-medium text-lg text-stone-700">{nameOfCurrentState}</h1>
        {
            renderElements
        }
    </section>
  )
}

export default Header