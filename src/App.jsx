import React, { useState } from 'react'
import Navigation from './components/Navigation'

const App = () => {
  const [selectedSection, setSelectedSection] = useState("Todo List");
  
  return (
    <div className='flex'>
      <Navigation
        updatedSection={selectedSection}
        setUpdatedSection={setSelectedSection}
      />
    </div>
  )
}

export default App