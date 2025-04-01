import './PantherMortality.css'
import React, { useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function PantherMortality() {

  const [minYear1, setMinYear1] = useState('');
  const [maxYear1, setMaxYear1] = useState('');
  const [sex1, setSex1] = useState('');
  const [minAge1, setMinAge1] = useState('');
  const [maxAge1, setMaxAge1] = useState('');

  const [minAge2, setMinAge2] = useState('');
  const [maxAge2, setMaxAge2] = useState('');
  const [sex2, setSex2] = useState('');

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const handleMinYear1Change = (e) => {
    setMinYear1(e.target.value)
  }

  const handleMaxYear1Change = (e) => {
    setMaxYear1(e.target.value)
  }

  const handleMinAge1Change = (e) => {
    setMinAge1(e.target.value)
  }

  const handleMaxAge1Change = (e) => {
    setMaxAge1(e.target.value)
  }

  const handleSex1Change = (e) => {
    setSex1(e.target.value)
  }

  const handleMinAge2Change = (e) => {
    setMinAge2(e.target.value)
  }

  const handleMaxAge2Change = (e) => {
    setMaxAge2(e.target.value)
  }

  const handleSex2Change = (e) => {
    setSex2(e.target.value)
  }

  const handleGo1Click = async () => {
    if(!minAge1 || !maxAge1 || !sex1 || !minYear1 || !maxYear1) {
      alert('Please enter all fields.')
      return
    }
    try {
      const response = await fetch('http://localhost:5000/mortalityQuery1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({minAge1, maxAge1, sex1, minYear1, maxYear1}),
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
    if(!minAge2 || !maxAge2 || !sex2) {
      alert('Please enter all fields.')
      return
    }
    try {
      const response = await fetch('http://localhost:5000/mortalityQuery2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({minAge2, maxAge2, sex2}),
      })
      if (response.ok){
        const fetchedData2 = await response.json();
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
          Mortality Data
        </div>

        <div className='maincontent'>
          <div className='componentLeftside'>
            <div className='queryMetadata'>
              <div className='queryTitle'>
                Mortality HeatMap
              </div>
              <div className='queryDesc'>
                <p>
                  Users can analyze the geographic distribution of panther mortalities based on specific age, sex, and year range criteria. By entering a minimum and maximum age, selecting the sex of the panther, and defining a year range, users can retrieve a list of locations where panther deaths have occurred. The results are used to create a heatmap of panther deaths, helping to identify high-risk areas and trends over time.
                </p>
              </div>
            </div>
            <div className='inputs1'>
              <input type='number' placeholder='Minimum Age' value={minAge1} onChange={handleMinAge1Change} className='minAge1'/>
              <input type='number' placeholder='Maximum Age' value={maxAge1} onChange={handleMaxAge1Change} className='maxAge1'/>
              <input type='number' placeholder='Minimum Year' value={minYear1} onChange={handleMinYear1Change} className='minYear1'/>
              <input type='number' placeholder='Maximum Year' value={maxYear1} onChange={handleMaxYear1Change} className='maxYear1'/>
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
            <div className='heatmap'>

            </div>
          </div>

          <div className='componentRightside'>
            <div className='queryMetadata'>
              <div className='queryTitle'>
                Top Mortality Causes
              </div>
              <div className='queryDesc'>
                <p>
                  Users can explore the causes of panther mortality based on age and sex criteria. By specifying a minimum and maximum age and selecting the sex of the panther, the query returns a ranked list of mortality causes along with the number of deaths attributed to each. The results help identify the most common threats to panthers, providing valuable insights for conservation efforts and risk assessment.
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
              <div className='barGraph'>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart 
                    data={data2} 
                    layout="vertical" 
                    margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                  >
                    <XAxis 
                      type="number" 
                      domain={[0, 'dataMax']}
                      stroke="#FFFFFF"
                      tick={{ fill: '#FFFFFF', fontSize: 20 }}
                      tickLine={{ stroke: '#FFFFFF' }}
                    />
                    <YAxis 
                      dataKey="Cause" 
                      type="category" 
                      width={150}
                      stroke="#FFFFFF"
                      tick={{ fill: '#FFFFFF', fontSize: 20, fontFamily: 'Arial' }}
                    />
                    <Legend 
                      wrapperStyle={{
                        paddingTop: '15px',
                        fontSize: '14px',
                        fontFamily: 'Arial',
                        color: '#FFFFFF'
                      }}
                      iconSize={12}
                      iconType="rect"
                    />
                    <Bar 
                      dataKey="CauseCount"
                      fill="#000000"
                      name="Count"
                      barSize={25}
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PantherMortality
