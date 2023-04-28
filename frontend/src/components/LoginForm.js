import Notification from "./Notification";

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

export default LoginForm