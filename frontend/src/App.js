import React, {useState, useEffect} from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhoneNo, setNewPhoneNo] = useState('')
    const [filter, setFilter] = useState('');
    const [errorMessage, setErrorMessage] = useState(null)
    const [errorOccurred, setErrorOccurred] = useState(false);

    useEffect(() => {
        personsService
            .getAll()
            .then(allPersons => setPersons(allPersons))
    }, []);

    function resetErrorMessage(message, errorOccurred) {
        setErrorOccurred(errorOccurred)
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const addPerson = (event) => {
        event.preventDefault()
        if ((newName === '') && (newPhoneNo === ''))
            return

        const newPerson = {
            name: newName,
            phoneNumber: newPhoneNo,
        }

        if (persons.find(person => person.name === newPerson.name)) {
            if (window.confirm(`${newName} ist already added to phonebook, replace old number with a new one?`)) {
                const bufferPerson = persons.find(p => p.name === newPerson.name)
                const updatedPerson = {...bufferPerson, phoneNumber: newPhoneNo}
                personsService
                    .update(updatedPerson)
                    .then(retPerson => {
                        resetErrorMessage(`Changed number for ${newPerson.name} to ${newPerson.phoneNumber}`, false)
                        setPersons(persons.map(p => p.id !== retPerson.id ? p : retPerson))
                    })
                    .catch(() => resetErrorMessage(`Information of ${newPerson.name} has already been removed from server`, true))
            }
        } else {
            personsService
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    resetErrorMessage(`Added ${returnedPerson.name}`, false)
                })
                .catch(error => {
                    console.log(error.response.data.error)
                    resetErrorMessage(error.response.data.error, true)
                })
        }

        setNewName('')
        setNewPhoneNo('')
    }
    const handleNameOnChange = (event) => setNewName(event.target.value)
    const handleOnChangePhoneNo = (event) => setNewPhoneNo(event.target.value)
    const handleOnFilterEntries = (event) => setFilter(event.target.value)

    const numbersToShow = (filter === '') ? persons : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={errorMessage} errorOccurred={errorOccurred}/>
            <Filter onChangeAction={handleOnFilterEntries}/>
            <h2>Add a new entry</h2>
            <PersonForm addPerson={addPerson} newName={newName} newPhoneNo={newPhoneNo}
                        handleNameOnChange={handleNameOnChange} handleOnChangePhoneNo={handleOnChangePhoneNo}/>
            <h2>Numbers</h2>
            <Persons persons={numbersToShow} _person={persons} updatePerson={setPersons}/>
        </div>
    )
}

export default App