import './Header.css'

function Header({ selectedTheme, handleThemeSelect }) {

  return (
    <>
      <div className='container'>
        <div className="leftside">
          <img alt="logo" src="/panther icon.png" className="logo"></img>
          <p className="title">Florida Panther Data Analyzer</p>
        </div>

        <div className="rightside">
          <select value={selectedTheme} onChange={handleThemeSelect} className="query-select">
            <option value="">Select Analysis Theme</option>
            <option value="location">Panther Location Analysis</option>
            <option value="mortality">Panther Mortality Analysis</option>
            <option value="telemetry">Panther Telemetry Data Analysis</option>
          </select>
        </div>
      </div>
    </>
  )
}

export default Header
