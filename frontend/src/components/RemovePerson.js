import personsService from "../services/persons";

const RemovePerson = ({person, persons, updatePersons}) => {
    const handleDeletePerson = () => {
        if (!window.confirm(`Would you like to delete ${person.name}`)) return

        personsService
            .deletePerson(person.id)
            .then(() => {
                return updatePersons(persons.filter(p => p.id !== person.id))
            })
            .catch(() => {
                console.log("Another error while removing a person")
            })

    }

    return (<button onClick={handleDeletePerson}>
            delete
        </button>)
}

export default RemovePerson