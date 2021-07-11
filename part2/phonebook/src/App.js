import React, { useState } from 'react'

const Filter = ({newSearch, handleSearchChange}) => {
  return(
  <div>
    <form>
      filter shown with <InputWithChange vari = {newSearch} handleVariChange = {handleSearchChange} />
    </form>
  </div> 
  ) 
}

const InputWithChange = ({vari, handleVariChange}) => {
  return(
    <div>
      <input value = {vari} onChange = {handleVariChange} />
    </div>
  )
}

const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return(
    <div>
      <form onSubmit = {addPerson}>
        <div>
          name: <InputWithChange vari = {newName} handleVariChange = {handleNameChange} />
        </div>
        <div>
          number: <InputWithChange vari = {newNumber} handleVariChange = {handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({persons, newSearch}) => {
  const filteredPersons = newSearch === ''
  ? persons
  : persons.filter(person => person.name.toLocaleLowerCase().includes(newSearch.toLocaleLowerCase()))
  return(
    <div>
        {filteredPersons.map(person => 
         <p key={person.id}> {person.name} {person.number}</p>)}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    }

    let obj = persons.some(person => person.name === newName)
    if(obj){
      window.alert(`${newName} is already in the phonebook.`)
    } else{
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      <h2>add a new number </h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch = {newSearch}/>
    </div>
  )
}

export default App