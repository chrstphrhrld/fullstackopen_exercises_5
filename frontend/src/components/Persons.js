import RemovePerson from "./RemovePerson";

const Persons = ({persons, _person, updatePerson}) => {
    return (
        <div>
            {persons.map((person) =>
                <p key={person.id}> {person.name}: {person.phoneNumber} <RemovePerson person={person}
                                                                                      persons={_person}
                                                                                      updatePersons={updatePerson}/>
                </p>)}
        </div>

    )
}

export default Persons