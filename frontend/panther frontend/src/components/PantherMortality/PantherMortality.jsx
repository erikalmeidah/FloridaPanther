import './PantherMortality.css'
import React, { useState } from 'react'

function PantherMortality() {

  const [minYear1, setMinYear1] = useState('');
  const [maxYear1, setMaxYear1] = useState('');
  const [sex1, setSex1] = useState('');
  const [minAge1, setMinAge1] = useState('');
  const [maxAge1, setMaxAge1] = useState('');

  const [minAge2, setMinAge2] = useState('');
  const [maxAge2, setMaxAge2] = useState('');
  const [sex2, setSex2] = useState('');

  let data1 = ''
  let data2 = ''

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
        data2 = await response.json()
        console.log(data2.length);
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
            {data2 && (<div className='barGraph'>
              
            </div>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default PantherMortality
