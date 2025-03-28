import './DefaultPage.css'

function DefaultPage() {

  return (
    <div className='componentContent'>
      <div className='componentTitle'>
        Welcome to the Florida Panther Data Analyzer
      </div>

      <div className='mainContent'>
        <div className='componentLeftside'>
          <p className='websiteIntro'>
            Description goes here
          </p>
        </div>

        <div className='componentRightside'>
          <img alt='florida map' src='/floridamap.jpg' className='florida'></img>
        </div>
      </div>
    </div>
  )
}

export default DefaultPage
