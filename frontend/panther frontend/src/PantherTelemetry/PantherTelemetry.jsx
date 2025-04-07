import HeatMap from '../components/heatmap/Heatmap';
import './PantherTelemetry.css'
import React, { useState } from 'react'
import LineGraph from '../components/LineGraph/LineGraph';

function PantherTelemetry() {
  const [sex1, setSex1] = useState('');
  const [sex2, setSex2] = useState('');
  const [minAge2, setMinAge2] = useState('');
  const [maxAge2, setMaxAge2] = useState('');

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const handleSex1Change = (e) => {
    setSex1(e.target.value)
  }

  const handleSex2Change = (e) => {
    setSex2(e.target.value)
  }

  const handleMinAge2Change = (e) => {
    setMinAge2(e.target.value)
  }

  const handleMaxAge2Change = (e) => {
    setMaxAge2(e.target.value)
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

  const handleGo2Click = async () => {
    if(!sex2 || !minAge2 || !maxAge2) {
      alert('Please enter all fields.')
      return
    }
    try {
      const response = await fetch('http://localhost:5000/telemetryQuery2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({minAge2, maxAge2, sex2}),
      })
      if (response.ok){
        const fetchedData2 = await response.json();
        console.log(fetchedData2);
        setData2(fetchedData2);
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
                  Users can visualize the most popular locations where panthers have been tracked, based on their GPS data. Users can choose to see results for male or female panthers, and the top 100 locations with the most visits will be displayed on a heatmap. This makes it easy to understand where panthers spend the most time and how they move through their habitat.
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
              <button onClick={handleGo1Click} className='Go1'>
                Go
              </button>
            </div>
            {data1.length > 0 && (
              <div className="heatmap">
                <HeatMap data={data1} />
              </div>
            )}
          </div>

          <div className='telemetryComponentRightside'>
            <div className='queryMetadata'>
                <div className='queryTitle'>
                  Telemetry Per Year Graph
                </div>
                <div className='queryDesc'>
                  <p>
                    Users can track the amount of panther sightings per year, filtering by panther's age range and sex, and then a graph is plotted to display increasing/decreasing behavior of panthers sightings over time, allowing for users to make observations about the dwindling number of Florida Panthers.
                  </p>
                </div>
              </div>
              <div className='inputs2'>
                <input type='number' placeholder='Minimum Age' value={minAge2} onChange={handleMinAge2Change} className='minAge2'/>
                <input type='number' placeholder='Maximum Age' value={maxAge2} onChange={handleMaxAge2Change} className='maxAge2'/>
                <select name='sex' value={sex2} onChange={handleSex2Change} className='sex2'>
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
                <button onClick={handleGo2Click} className='Go2'>
                  Go
                </button>
              </div>
              {data2.length > 0 && (
                <div className="graph">
                    <LineGraph data={data2}/>
                </div>
              )}
            </div>
          </div>
        </div>
    </>
  )
}

export default PantherTelemetry
