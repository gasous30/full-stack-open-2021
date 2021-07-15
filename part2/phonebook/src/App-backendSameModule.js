import React, { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/person";

const Filter = ({ newSearch, handleSearchChange }) => {
  return (
    <div>
      <form>
        filter shown with{" "}
        <InputWithChange
          vari={newSearch}
          handleVariChange={handleSearchChange}
        />
      </form>
    </div>
  );
};

const InputWithChange = ({ vari, handleVariChange }) => {
  return (
    <div>
      <input value={vari} onChange={handleVariChange} />
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <InputWithChange vari={newName} handleVariChange={handleNameChange} />
        </div>
        <div>
          number:{" "}
          <InputWithChange
            vari={newNumber}
            handleVariChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Persons = ({ persons, newSearch }) => {
  const deletePersonsOf = (idKey) => {
    const url = `http://localhost:3001/persons/${idKey}`;
    const wantToDelete = persons.find((p) => p.id === idKey);
    axios.delete(url, wantToDelete);
  };

  const filteredPersons =
    newSearch === ""
      ? persons
      : persons.filter((person) =>
          person.name
            .toLocaleLowerCase()
            .includes(newSearch.toLocaleLowerCase())
        );
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {" "}
          {person.name} {person.number}
          <button onClick={() => deletePersonsOf(person.id)}> delete </button>
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  });

  const replaceNumber = (newNumber) => {
    const wantToReplace = persons.find((p) => p.name === newName);
    console.log(wantToReplace);
    const url = `http://localhost:3001/persons/${wantToReplace.id}`;
    const changedContact = { ...wantToReplace, number: newNumber };

    axios.put(url, changedContact).then((response) => {
      window.alert(`${wantToReplace.name}'s number has been replaced.`);
    });
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      id:
        Math.max.apply(
          Math,
          persons.map((p) => p.id)
        ) + 1,
      number: newNumber,
    };

    let obj = persons.some((person) => person.name === newName);
    if (obj) {
      let answ = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (answ) {
        console.log("Replacing...");
        replaceNumber(newNumber);
      }
    } else {
      axios
        .post("http://localhost:3001/persons", personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>add a new number </h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} />
    </div>
  );
};

export default App;
