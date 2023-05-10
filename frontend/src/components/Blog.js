import { useState } from 'react'
import BlogEntryDetails from './BlogEntryDetails'

const Blog = ({ blog, updateLikesOnBlogEntry, removeBlogEntryById, userId }) => {
	const [viewDetails, setViewDetails] = useState(false)
	const [showRemoveButton, setShowRemoveButton] = useState(false)
	const handleOnClickToggleShow = () => {
		setViewDetails(!viewDetails)
		setShowRemoveButton(userId === blog.user.username)
		console.log(userId === blog.user.username, userId, blog.user.username)
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		paddingBottom: 4,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
		borderRadius: 5,
		marginTop: 5
	}

	return (<div style={ blogStyle }>
		<div className='blog-entry'>
			{ blog.title }
			<button className='buttonStyle'
			        onClick={ handleOnClickToggleShow }> { viewDetails ? 'hide' : 'view' }
			</button>
			{ viewDetails && <BlogEntryDetails blog={ blog } updatedLikesOnBlogEntry={ updateLikesOnBlogEntry }
			                                   removeBlogEntryById={ removeBlogEntryById }
			                                   showRemoveButton={ showRemoveButton }/> }
		</div>
	</div>)
}


export default Blog