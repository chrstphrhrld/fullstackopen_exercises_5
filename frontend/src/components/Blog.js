import {useState} from "react";

const Blog = ({ blog }) => {
	const [viewDetails, setViewDetails] = useState(false);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	return (
		<div style={ blogStyle }>

			<div>
				<p>
					{ blog.title } - { blog.author }
					<button
						onClick={ () => setViewDetails(!viewDetails) }>{ () => (viewDetails ? 'hide' : 'view') }</button>
				</p>
			</div>
		</div>
	)
}


export default Blog