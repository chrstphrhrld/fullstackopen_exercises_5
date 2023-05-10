import { useState } from 'react'

const BlogEntry = ({ addNewBlogEntry }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const createNewBlogEntry = (event) => {
		event.preventDefault()

		const newBlogEntry = {
			title: title,
			author: author,
			url: url
		}
		addNewBlogEntry(newBlogEntry)
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div placeholder='Blog Entry Input Form'>
			<form onSubmit={ createNewBlogEntry }>
				<p>title: <input type='text' name='title' onChange={ ({ target }) => setTitle(target.value) }
				                 value={ title } placeholder='title input'/></p>
				<p>author: <input type='text' name='author' onChange={ ({ target }) => setAuthor(target.value) }
				                  value={ author } placeholder='author input'/></p>
				<p>url: <input type='text' name='url' onChange={ ({ target }) => setUrl(target.value) }
				               value={ url } placeholder='url input'/></p>
				<button className='buttonStyle' type='submit'>create</button>
			</form>
		</div>
	)
}

export default BlogEntry