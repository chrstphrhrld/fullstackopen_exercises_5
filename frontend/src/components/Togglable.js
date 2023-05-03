import {useState, useImperativeHandle, forwardRef} from 'react'

const Togglable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<div>
			<div style={ hideWhenVisible }>
				<button className='buttonStyle' onClick={ toggleVisibility }>{ props.buttonLabel }</button>
			</div>
			<div style={ showWhenVisible }>
				{ props.children }
				<button className='buttonStyle' onClick={ toggleVisibility }>cancel</button>
			</div>
		</div>
	)
})

export default Togglable