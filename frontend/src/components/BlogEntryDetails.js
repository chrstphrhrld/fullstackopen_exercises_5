const BlogEntryDetails = ({ blog, updatedLikesOnBlogEntry, removeBlogEntryById, showRemoveButton }) => {

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
	}

	return (
		<div>
			<div>
				{ blog.url } <br/>
			</div>
			{ blog.likes }
			<button className='buttonStyle' onClick={ handleOnLikesClick }>like</button>
			<br/>
			{ blog.author }<br/>
			<button className='buttonStyle' style={ { display: showRemoveButton ? '' : 'none' } }
			        onClick={ handleOnRemoveClick }>
				remove
			</button>
		</div>
	)
}

export default BlogEntryDetails