import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogEntry from "./components/BlogEntry";
import Notification from "./components/Notification";
import Toggleable from "./components/Togglable";
import blogEntry from "./components/BlogEntry";
import LoginForm from "./components/LoginForm";

const App = () => {
	const [blogs, setBlogs] = useState([])

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const [errorMessage, setErrorMessage] = useState(null)
	const [errorOccurred, setErrorOccurred] = useState(false)

	const blogEntryToggleRef = useRef()

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
			blogService.getAll().then(blogs => setBlogs(blogs))
		}
	}, [])

	const resetErrorMessage = (message, errorOccurred) => {
		setErrorOccurred(errorOccurred)
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
		}, 5000)
	}

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
			<Notification message={ errorMessage } errorOccurred={ errorOccurred }/>
			{ !user && <Toggleable buttonLabel='log in to the application'>
				<LoginForm username={ username } password={ password } handleSubmit={ handleLogin }
				           handlePasswordChange={ setPassword } handleUsernameChange={ setUsername }/>
			</Toggleable> }
			{ user &&
				<div>
					<h2>blogs</h2>
					<p>{ user.name } is logged in
						<button onClick={ handleLogout }>logout</button>
					</p>
					<h2>create new</h2>
					<Toggleable buttonLabel='new blog entry' ref={ blogEntryToggleRef }>
						<BlogEntry setUpdatedBlogs={ setBlogs } errorSuccessHandler={ resetErrorMessage }
							setVisibility={ blogEntryToggleRef.current.toggleVisibility() }
						/>
					</Toggleable>
					{
						blogs.map(blog =>
							<Blog key={ blog.id } blog={ blog }/>
						)
					}
				</div>
			}
		</div>
	)
}

export default App