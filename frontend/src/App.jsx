import './App.css'
import Header from './components/Header/Header.jsx'
import React, { useState } from 'react'
import DefaultPage from './DefaultPage/DefaultPage.jsx'
import PantherMortality from './PantherMortality/PantherMortality.jsx'
import PantherTelemetry from './PantherTelemetry/PantherTelemetry.jsx'
import 'leaflet/dist/leaflet.css';

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
          {selectedTheme === 'mortality' && <PantherMortality />}
          {selectedTheme === 'telemetry' && <PantherTelemetry />}
          {selectedTheme === '' && <DefaultPage />}
        </main>
      </div>
    </>
  )
}

export default App
