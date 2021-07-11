import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Weather from './Weather'

const FilterCountries = ({newFilter, handleFilterChange}) => {
  return(
    <div>
      find countries <input value={newFilter} onChange={handleFilterChange}/>
    </div>
  )
}

const OneCountry = ({theCountry}) => {
  return(
    <div>
      <h2>{theCountry.name}</h2>
      <p>capital {theCountry.capital}</p>
      <p>population {theCountry.population}</p>
      <h3>languages</h3>
      <ul>
        {theCountry.languages.map(language => {
          return(
            <li key={language.iso639_2}>{language.name}</li>
          )
        })}
      </ul>
      <img src={theCountry.flag} alt={theCountry.flag} width="200"/>
      <Weather capital={theCountry.capital}/>
    </div>
  )
}

const ShowButton = ({country}) => {
  const [ showCountry, setShowCountry ] = useState(false)
  return (
    <div>
    <button id={country.name} value = {showCountry} onClick={() => setShowCountry(true)}> show</button>
    {showCountry ? <OneCountry theCountry={country} />: null }
    </div>
  )
}

const ListCountries = ({newFilter, countries, showCountry, handleShowCountry, idButtonPressed}) => {
  const filteredCountries = newFilter === ''
  ? countries
  : countries.filter(country => country.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase()))
  if (filteredCountries.length === 1){
    return(
      <OneCountry theCountry={filteredCountries[0]} />
    )
  }
  else if(filteredCountries.length < 10){
    return(
      <div>  
        {filteredCountries.map((country) =>
            <div key={country.name}> {country.name}
            <ShowButton country={country} showCountry={showCountry} handleShowCountry={handleShowCountry} />
            </div>
          )}
      </div>
    )
  }
  else{
    return(
      <p>Too many matches, specify another filter</p>
    )
  }
}

const App = () => {
  
  const [ newFilter, setNewFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  },[])
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  return(
    <div>
      <FilterCountries newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <ListCountries newFilter={newFilter} countries={countries} />
    </div>
  )
}

export default App