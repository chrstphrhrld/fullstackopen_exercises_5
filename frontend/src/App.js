import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

const App = () => {
	const [notes, setNotes] = useState([])
	const [, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const notesFromRef = useRef()

	useEffect(() => {
		noteService
			.getAll()
			.then(initialNotes => {
				setNotes(initialNotes)
			})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			noteService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password
			})

			window.localStorage.setItem(
				'loggedNoteappUser', JSON.stringify(user)
			)
			noteService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('Wrong Credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const addNote = (noteObject) => {
		notesFromRef.current.toggleVisibility()
		noteService
			.create(noteObject)
			.then(returnedNote => {
				setNotes(notes.concat(returnedNote))
				setNewNote('')
			})
	}

	const notesToShow = showAll
		? notes
		: notes.filter(note => note.important)

	const toggleImportanceOf = id => {
		const note = notes.find(n => n.id === id)
		const changedNote = { ...note, important: !note.important }

		noteService
			.update(id, changedNote).then(returnedNote => {
				setNotes(notes.map(note => note.id !== id ? note : returnedNote))
			})
			.catch(() => {
				setErrorMessage(
					`Note '${ note.content }' was already removed from server`
				)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
				setNotes(notes.filter(n => n.id !== id))
			})
	}


	const loginForm = () => {
		return (
			<Togglable buttonLabel='login'>
				<LoginForm
					username={ username }
					password={ password }
					handleUsernameChange={ ({ target }) => setUsername(target.value) }
					handlePasswordChange={ ({ target }) => setPassword(target.value) }
					handleSubmit={ handleLogin }
				/>
			</Togglable>
		)
	}
	return (
		<div>
			<h1>Notes app</h1>
			<Notification message={ errorMessage }/>

			{ !user && loginForm() }
			{ user && <div>
				<p>{ user.name } logged in</p>
				<Togglable buttonLabel='new note' ref={notesFromRef}>
					<NoteForm createNote={ addNote }/>
				</Togglable>
			</div> }

			<div>
				<button onClick={ () => setShowAll(!showAll) }>
					show { showAll ? 'important' : 'all' }
				</button>
			</div>
			<ul>
				<ul>
					{ notesToShow.map(note =>
						<Note
							key={ note.id }
							note={ note }
							toggleImportance={ () => toggleImportanceOf(note.id) }
						/>
					) }
				</ul>
			</ul>
			<Footer/>
		</div>
	)
}

export default App
