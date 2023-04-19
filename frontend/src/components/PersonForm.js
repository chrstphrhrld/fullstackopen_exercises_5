const PersonForm = ({addPerson, newName, newPhoneNo, handleNameOnChange, handleOnChangePhoneNo}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                <p>name: <input value={newName} onChange={handleNameOnChange}/></p>
                <p>phone no: <input value={newPhoneNo} onChange={handleOnChangePhoneNo}/></p>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
