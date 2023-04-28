import styling from '../index.css'

const BlogEntryDetails = ({ blog, updatedLikesOnBlogEntry }) => {

	const handleOnLikesClick = async (event) => {
		event.preventDefault()
		updatedLikesOnBlogEntry({ ...blog, likes: blog.likes + 1 })
	}

	return (
		<div>
			{ blog.url } <br/>
			{ blog.likes }
			<button className='buttonStyle' onClick={ handleOnLikesClick }>like</button>
			<br/>
			{ blog.author }<br/>
		</div>
	)
}

export default BlogEntryDetails