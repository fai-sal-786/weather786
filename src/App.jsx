import { useState } from 'react'
import axios from 'axios'


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=7522f4fb94f9feac1269b3d83731009b`;
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation('')
    }
  }
  return (
    <div className='app'>
      <div className='search'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type='text' />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
  
        {data.name !== undefined &&
          <div className='bottom'>
            <div className='feels'>
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>feel like</p>
            </div>
            <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
export default App;

