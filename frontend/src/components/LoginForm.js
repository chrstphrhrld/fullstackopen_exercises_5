import PropTypes from 'prop-types'

const LoginForm = ({
	                   handleSubmit,
	                   handleUsernameChange,
	                   handlePasswordChange,
	                   username,
	                   password,
}) => (
	<div>
		<h1>log in to application</h1>
		<form onSubmit={ handleSubmit }>
			<div>
				username
				<input
					type='text'
					value={ username }
					onChange={ ({ target }) => handleUsernameChange(target.value) }
				/>
			</div>
			<div>
				password
				<input
					type='password'
					value={ password }
					onChange={ ({ target }) => handlePasswordChange(target.value) }
				/>
			</div>
			<div>
				<button className='buttonStyle' type='submit'>login</button>
			</div>
		</form>
	</div>
)

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default LoginForm