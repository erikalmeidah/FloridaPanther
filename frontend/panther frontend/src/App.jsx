import './App.css'
import Header from './components/Header/Header.jsx'
import React, { useState } from 'react'
import DefaultPage from './DefaultPage/DefaultPage.jsx'
import PantherLocation from './PantherLocation/PantherLocation.jsx'
import PantherMortality from './components/PantherMortality/PantherMortality.jsx'
import PantherTelemetry from './components/PantherTelemetry/PantherTelemetry.jsx'

function App() {
  const [selectedTheme, setSelectedTheme] = useState('')

  const handleThemeSelect = (event) => {
    setSelectedTheme(event.target.value)
  }

  return (
    <>
      <Header selectedTheme={selectedTheme} handleThemeSelect={handleThemeSelect}/>
      
      <div className='content'>
        <main>
          {selectedTheme === 'location' && <PantherLocation />}
          {selectedTheme === 'mortality' && <PantherMortality />}
          {selectedTheme === 'telemetry' && <PantherTelemetry />}
          {selectedTheme === '' && <DefaultPage />}
        </main>
      </div>
    </>
  )
}

export default App
