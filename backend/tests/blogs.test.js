const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const blogs = require('../tests/blogs_helper')
const User = require('../models/user')
const users = require('../tests/user_helper')

beforeEach(async () => {
	await Blog.deleteMany({})
	await User.deleteMany({})
	await Blog.insertMany(blogs.blogEntries)
	// await User.insertMany(users.userEntries)
}, 100000)

test('dummy returns one', () => {
	const result = listHelper.dummy()
	expect(result).toBe(1)
}, 100000)

describe('total likes', () => {
	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		}
	]

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})

	test('when list has a blog, with 12 likes', () => {
		expect(listHelper.favoriteBlog(blogs.blogEntries)).toEqual({
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12
		})
	})

	test('when list of blog, has three written by george maritn', () => {
		expect(listHelper.mostBlogs(blogs.blogEntries)).toEqual({
			author: 'Robert C. Martin',
			blogs: 3
		})
	})

	test('when list of blog with summed likes, equals that', () => {
		expect(listHelper.mostLikes(blogs.blogEntries)).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17
		})
	})

	test('return all blogs which have the length of the initial blogs', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(blogs.blogEntries.length)
	}, 1000000)

	test('id property exists in response', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body[0].id).toBeDefined()
	})

	it('should create a new blog post and verfiy the amount has increased', async () => {
		await api.post('/api/users')
			.send(users.userEntries[0])
			.expect(201)

		const response = await api
			.post('/api/login')
			.send({
				username: users.userEntries[0].username,
				password: users.userEntries[0].password
			})
			.expect(200)

		const userInDb = await api.get('/api/users')

		const newBlogEntry = new Blog({
			title: 'Test me baby one more time',
			author: 'Edsger W. Hupatz',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			userId: userInDb._body[0].id
		})

		await api
			.post('/api/blogs')
			.set('Authorization', 'Bearer ' + response._body.token)
			.send(newBlogEntry)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const totalBlogs = await api.get('/api/blogs')
			.set('Authorization', `Bearer ${ response.body.token }`)
		expect(totalBlogs._body).toHaveLength(blogs.blogEntries.length + 1)

		const title = totalBlogs._body.map(b => b.title)
		expect(title).toContain('Test me baby one more time')
	})
})

describe('should post blog entries and evaluate result', () => {
	it('should set likes to 0, if like prop is not defined', async () => {
		const newBlogEntry = new Blog({
			title: 'Test me baby one more time',
			author: 'Edsger W. Hupatz',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		})

		const response = await api.post('/api/blogs')
			.send(newBlogEntry)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		expect(response.body.likes).toBe(0)
	})

	test('should return 400 response, if title or url in blog entry aren\'t filled', async () => {
		const newBlogEntry = new Blog({
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		})

		await api.post('/api/blogs')
			.send(newBlogEntry)
			.expect(400)
	})

	test('should update a single blog post', async () => {
		let blogsInDb = await api.get('/api/blogs')
		const updatedEntry = { ...blogsInDb.body[0], author: 'different author dude' }

		await api.post(`/api/blogs/${ updatedEntry.id }`)
			.send(updatedEntry)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		blogsInDb = await api.get('/api/blogs')
		expect(blogsInDb.body.map(b => b.author)).toContain('different author dude')
	})
})

describe('should remove entries and evaluate result', () => {
	test('should delete a blog entry by id', async () => {
		let blogsInDb = await api.get('/api/blogs')

		await api.delete(`/api/blogs/${ blogsInDb.body[0].id }`)
			.expect(204)

		blogsInDb = await api.get('/api/blogs')

		expect(blogsInDb.body).toHaveLength(blogs.blogEntries.length - 1)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
}, 100000)