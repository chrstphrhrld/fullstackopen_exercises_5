import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Note from '../Note'
import Togglable from "../Togglable";
import NoteForm from "../NoteForm";

const content = 'A note that everybody loves'


test('renders content', () => {
	const note = {
		content: content,
		important: true
	}

	render(<Note note={ note }/>)

	const element = screen.getByText(content)
	expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
	const note = {
		content: 'Component testing is done with react-testing-library',
		important: true
	}

	const mockHandler = jest.fn()

	render(
		<Note note={ note } toggleImportance={ mockHandler }/>
	)

	const user = userEvent.setup()
	const button = screen.getByText('make not important')
	await user.click(button)

	screen.debug()

	expect(mockHandler.mock.calls).toHaveLength(1)
})

describe('<Togglable />', () => {
	let container

	beforeEach(() => {
		// save rendered component to container
		container = render(
			<Togglable buttonLabel='show...'>
				<div className='testDiv'>
					togglable content
				</div>
			</Togglable>
		).container
	})

	screen.debug()

	test('renders its children', async () => {
		await screen.findAllByText('togglable content')
	})

	test('at start the children are not displayed', () => {
		const div = container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})

	test('after clicking the button, children are displayed', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('show...')
		await user.click(button)

		const div = container.querySelector('.togglableContent')
		expect(div).not.toHaveStyle('display: none')
	})

	test('toggled content can be closed', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('show...')
		await user.click(button)

		const closeButton = screen.getByText('cancel')
		await user.click(closeButton)

		const div = container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})

	test('<NoteForm /> updates parent state and calls onSubmit', async () => {
		const createNote = jest.fn()
		const user = userEvent.setup()

		render(<NoteForm createNote={ createNote }/>)

		const input = screen.getByPlaceholderText('write note content here')
		const sendButton = screen.getByText('save')

		await user.type(input, 'testing a form...')
		await user.click(sendButton)

		expect(createNote.mock.calls).toHaveLength(1)
		expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
	})
})