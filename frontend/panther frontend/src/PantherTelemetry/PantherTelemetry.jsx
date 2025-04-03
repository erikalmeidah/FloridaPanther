import './PantherTelemetry.css'
import React, { useState } from 'react'

function PantherTelemetry() {
  const [sex1, setSex1] = useState('');
  const [data1, setData1] = useState([]);

  const handleSex1Change = (e) => {
    setSex1(e.target.value)
  }

  const handleGo1Click = async () => {
    if(!sex1) {
      alert('Please enter all fields.')
      return
    }
    try {
      const response = await fetch('http://localhost:5000/telemetryQuery1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({sex1}),
      })
      if (response.ok){
        const fetchedData1 = await response.json();
        console.log(fetchedData1);
        setData1(fetchedData1);
      } 
    }
    catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <>
      <div className='componentContent'>
        <div className='componentTitle'>
          Telemetry Data
        </div>

        <div className='maincontent'>
          <div className='telemetryComponentLeftside'>
            <div className='queryMetadata'>
              <div className='queryTitle'>
                Telemetry Spots HeatMap
              </div>
              <div className='queryDesc'>
                <p>
                  This query helps visualize the most popular locations where panthers have been tracked, based on their GPS data. Users can choose to see results for male or female panthers, and the top 10 locations with the most visits will be displayed on a heatmap. This makes it easy to understand where panthers spend the most time and how they move through their habitat.
                </p>
              </div>
            </div>
            <div className='inputs1'>
              <select name='sex' value={sex1} onChange={handleSex1Change} className='sex1'>
                <option value=''>
                  Sex
                </option>
                <option value='Male'>
                  Male
                </option>
                <option value='Female'>
                  Female
                </option>
              </select>
              <button onClick={handleGo1Click} className='Go2'>
                Go
              </button>
            </div>
          </div>

          <div className='telemetryComponentRightside'>
            Query 2 here
          </div>
        </div>
      </div>
    </>
  )
}

export default PantherTelemetry
