import {useState} from "react";
import blogService from '../services/blogs'

const BlogEntry = ({ setUpdatedBlogs, errorSuccessHandler, setVisibility }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const handleOnSubmit = async (event) => {
		setVisibility()
		event.preventDefault()
		const newBlogEntry = {
			title: title,
			author: author,
			url: url
		}

		await blogService.create(newBlogEntry)
		blogService.getAll().then(blogs => setUpdatedBlogs(blogs))
		errorSuccessHandler(`${ title } by ${ author } added`, false)
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<form onSubmit={ handleOnSubmit }>
				<p>title: <input type='text' name='title' onChange={ ({ target }) => setTitle(target.value) }
				                 value={ title }/></p>
				<p>author: <input type='text' name='author' onChange={ ({ target }) => setAuthor(target.value) }
				                  value={ author }/></p>
				<p>url: <input type='text' name='url' onChange={ ({ target }) => setUrl(target.value) }
				               value={ url }/></p>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default BlogEntry