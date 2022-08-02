import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import CardWeather from './components/CardWeather'
import LoadingScreen from './components/LoadingScreen'
import './index.css'

function App() {

  const [coords, setCoords] = useState()

  useEffect(() => {

    const success = pos => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latlon)
    }

    navigator.geolocation.getCurrentPosition(success)
  }, [])

  return (
    <div className="App">
        <CardWeather lon={coords?.lon} lat={coords?.lat} />
    </div>
  )
}

export default App
