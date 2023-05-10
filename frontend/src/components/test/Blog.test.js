import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../Blog'
import BlogEntry from "../BlogEntry";
import userEvent from "@testing-library/user-event";

const blogEntry = {
	title: 'My favorite blog',
	author: 'Test Author',
	url: 'www.fooo.com',
	likes: 1,
	user: {
		username: 'admin'
	}
}
describe('should test if blog data is rendered and displayed correctly in Blog List', () => {
	test('should display blog title, but not url or numbers of likes', async () => {
		// author is not displayed by default, only title
		let { container } = render(<Blog blog={ blogEntry }/>)

		const div = container.querySelector('.blog-entry')
		expect(div).toBeDefined()
		expect(div).toHaveTextContent(blogEntry.title)
		expect(div).not.toHaveTextContent(blogEntry.url)
		expect(div).not.toHaveTextContent(blogEntry.likes)
		expect(div).not.toHaveTextContent(blogEntry.author)
	})

	test('should check that the blog\'s URL and the number of likes are shown when the show button is clicked', async () => {
		const { container } = render(<Blog blog={ blogEntry } userId='admin'/>)

		const user = userEvent.setup()
		const button = screen.getByText('view')

		await user.click(button)

		const div = container.querySelector('.blog-entry')
		expect(div).toBeDefined()
		expect(div).toHaveTextContent(blogEntry.title)
		expect(div).toHaveTextContent(blogEntry.url)
		expect(div).toHaveTextContent(blogEntry.likes)
	})

	test('should check, that if the like button is clicked twice, event handler received two clicks', async () => {
		const mockHandler = jest.fn()

		render(<Blog blog={ blogEntry } userId='admin' updateLikesOnBlogEntry={ mockHandler }/>)

		const user = userEvent.setup()
		let button = screen.getByText('view')

		await user.click(button)
		button = screen.getByText('like')

		screen.debug()

		await user.click(button)
		await user.click(button)

		expect(mockHandler.mock.calls).toHaveLength(2)
	})

	test('should check that the blog form receives the right details after submit button is clicked', async () => {
		const mockHandler = jest.fn()
		const user = userEvent.setup()

		render(<BlogEntry addNewBlogEntry={ mockHandler }/>)

		const titleInput = screen.getByPlaceholderText('title input')
		const authorInput = screen.getByPlaceholderText('author input')
		const urlInput = screen.getByPlaceholderText('url input')
		const createButton = screen.getByText('create')

		await user.type(titleInput, blogEntry.title)
		await user.type(authorInput, blogEntry.author)
		await user.type(urlInput, blogEntry.url)
		await user.click(createButton)

		expect(mockHandler.mock.calls).toHaveLength(1)
		expect(mockHandler.mock.calls[0][0].title).toBe(blogEntry.title)
		expect(mockHandler.mock.calls[0][0].author).toBe(blogEntry.author)
		expect(mockHandler.mock.calls[0][0].url).toBe(blogEntry.url)
	})
})