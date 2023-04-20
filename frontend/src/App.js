import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogEntry from "./components/BlogEntry";
import Notification from "./components/Notification";

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	const [errorOccurred, setErrorOccurred] = useState(false);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
			blogService.getAll().then(blogs => setBlogs(blogs))
		}
	}, [])

	function resetErrorMessage(message, errorOccurred) {
		setErrorOccurred(errorOccurred)
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
		}, 5000)
	}

	const loginForm = () => (
		<div>
			<h1>log in to application</h1>
			<Notification message={ errorMessage } errorOccurred={ errorOccurred }/>
			<form onSubmit={ handleLogin }>
				<div>
					username
					<input
						name='username'
						type='text'
						onChange={ ({ target }) => setUsername(target.value) }
					/>
				</div>
				<div>
					password
					<input
						name='password'
						type='password'
						onChange={ ({ target }) => setPassword(target.value) }
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	)

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({ username, password })

			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

			blogService.setToken(user.token)
			setUser(user)
			setPassword('')
			setUsername('')
			blogService.getAll().then(blogs => setBlogs(blogs))
		} catch (exception) {
			resetErrorMessage('wrong username or password', true)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		resetErrorMessage(`${ user.name } logged out`, false)
		setUser(null)
	};

	return (
		<div>
			{ !user && loginForm() }
			{ user &&
				<div>
					<h2>blogs</h2>
					<p>{ user.name } is logged in
						<button onClick={ handleLogout }>logout</button>
					</p>
					<Notification message={ errorMessage } errorOccurred={ errorOccurred }/>
					<h2>create new</h2>
					<BlogEntry setUpdatedBlogs={ setBlogs } errorSuccessHandler={ resetErrorMessage }/>
					{ blogs.map(blog =>
						<Blog key={ blog.id } blog={ blog }/>
					) }
				</div> }
		</div>
	)
}

export default App