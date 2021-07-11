import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const [weather, setWeather] = useState({})

    const queryCapital = encodeURIComponent(capital.trim())
    const url = 'http://api.weatherstack.com/current'
    const accesKey = '895c574b5f332bd83439fe21a4632c03'


    useEffect(() => {
        axios         
       .get(`${url}?access_key=${accesKey}&query=${queryCapital}`)       
        .then(response => {
         setWeather(response.data.current);    
        })
      },[]);    

    return(
        <div>
            <h2>{`Weather in ${capital}`}</h2>
            <p><b>temperature:</b>{weather.temperature} Celcius </p>  
            <img src={weather.weather_icons} width="100" alt='icon'/>
            <p><b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}</p> 
        </div>
    )
}

export default Weather