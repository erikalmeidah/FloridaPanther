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
          The Florida Panther Data Analyzer is an interactive platform designed to provide users with in-depth insights into Florida panther populations and their habitats. Through this tool, users can explore and analyze various datasets related to panther mortality, telemetry data, and regional trends. With an intuitive interface, the platform allows users to select different types of queries to visualize and compare data, helping researchers, conservationists, and enthusiasts understand critical information about the species' movements and threats they face in the wild.
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
