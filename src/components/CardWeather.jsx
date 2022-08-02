import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'

const CardWeather = ({ lat, lon }) => {

    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [isCelsius, setIsCelsius] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (lat) {
            const APIKey = '65ae5e6a8b671e9287a036cf4edca090'
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

            axios.get(URL)
                .then(res => {
                    setWeather(res.data)
                    const temp = {
                        celcius: `${Math.round(res.data.main.temp - 273.15)} C`,
                        farenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 + 32)} F`
                    }
                    setTemperature(temp)
                    setIsLoading(false)
                })
                .catch(err => console.log(err))
        }
    }, [lat, lon])

    const handleClick = () => setIsCelsius(!isCelsius)

    if (isLoading) {
        return <LoadingScreen />
    } else {
        return (

            <article className='card' >

                <h1 className='tittle'>Weather App</h1>

                <h2 className='country-city'>{`${weather?.name}, ${weather?.sys.country}`}</h2>

                <div className='weather-c'>
                    <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
                    <div>
                        <h3 className='description'>&#34;{weather?.weather[0].description}&#34;
                        </h3>
                        <ul className='grade'>
                            <li><span className='color-w'>Wind Speed </span>{weather?.wind.speed} m/s</li>
                           
                            <li><span className='color-w'>Clouds </span>{weather?.clouds.all} %</li>
                          
                            <li><span className='color-w'>Pressure </span>{weather?.main.pressure} hPa</li>
                        </ul>
                    </div>
                </div>

                <h2 className='grade-c-f'>{isCelsius ? temperature?.celcius : temperature?.farenheit}</h2>

                <button className='button' onClick={handleClick}>{isCelsius ? 'Change to °F' : 'Change to °C'}</button>
                
            </article>
        )
    }
}


export default CardWeather