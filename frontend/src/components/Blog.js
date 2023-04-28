import {useState} from "react";
import BlogEntryDetails from "./BlogEntryDetails";

const Blog = ({ blog, updateLikesOnBlogEntry }) => {
	const [viewDetails, setViewDetails] = useState(false);

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

	return (
		<div style={ blogStyle }>

			<div>
				{ blog.title }
				<button className='buttonStyle'
				        onClick={ () => setViewDetails(!viewDetails) }> { viewDetails ? 'hide' : 'view' }
				</button>
				{ viewDetails &&
					<BlogEntryDetails blog={ blog } updatedLikesOnBlogEntry={ updateLikesOnBlogEntry }/>
				}
			</div>
		</div>
	)
}


export default Blog