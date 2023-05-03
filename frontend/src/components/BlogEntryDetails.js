import styling from '../index.css'

const BlogEntryDetails = ({ blog, updatedLikesOnBlogEntry, removeBlogEntryById, username }) => {

	const urlStyle = {
		paddingBottom: 10,
		fontFamily: 'Monserat'
	}

	const handleOnLikesClick = async (event) => {
		event.preventDefault()
		updatedLikesOnBlogEntry({ ...blog, likes: blog.likes + 1 })
	}

	const handleOnRemoveClick = (event) => {
		event.preventDefault()
		if (!window.confirm(`Remove ${ blog.title } by ${ blog.author }`))
			return
		console.log(blog.id)
		removeBlogEntryById(blog.id)
	};

	return (
		<div>
			<div>
				{ blog.url } <br/>
			</div>
			{ blog.likes }
			<button className='buttonStyle' onClick={ handleOnLikesClick }>like</button>
			<br/>
			{ blog.author }<br/>
			<button className='buttonStyle' style={ { display: username === blog.user.username ? '' : 'none' } }
			        onClick={ handleOnRemoveClick }>
				remove
			</button>
		</div>
	)
}

export default BlogEntryDetails