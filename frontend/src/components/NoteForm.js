import { useState } from 'react'

const noteForm = ({ createNote }) => {

	const [newNote, setNewNote] = useState('')

	const addNote = (event) => {
		event.preventDefault()
		createNote({
			content: newNote,
			important: Math.random() > 0.5,
		})

		setNewNote('')
	}

	return (
		<div>
			<form onSubmit={ addNote }>
				<input
					value={ newNote }
					onChange={ event => setNewNote(event.target.value) }
					placeholder='write note content here'
				/>
				<input
					value={ newNote }
					onChange={ event => setNewNote(event.target.value) }
				/>
				<button type="submit">save</button>
			</form>
		</div>
	)
}

export default noteForm