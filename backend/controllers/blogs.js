const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const mongoose = require("mongoose");

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogRouter.get('/:id', (request, response, next) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
		.catch(error => next(error))
})

blogRouter.post('/', async (request, response) => {
	// const body = (process.env.NODE_ENV === 'test')
	// 	? request._body
	// 	: request.body

	const body = request.body

	const user = request.user

	const updatedBlogEntry = () => {
		return !body.likes
			? { ...body, likes: '0', user: user.id }
			: body
	}

	if (body.title && body.author) {
		const blog = new Blog(updatedBlogEntry())
		const result = await blog.save()
		user.blogs = user.blogs.concat(result._id)
		await user.save()
		response.status(201).json(result)
	} else {
		response.status(400).end()
	}
})

blogRouter.put('/:id', async (request, response) => {
	const result = await Blog.findByIdAndUpdate(request.params.id, {
		...request.body,
		user: mongoose.Types.ObjectId(request.body.user)
	}, { new: true })
	response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
	console.log(request.params.id)
	const blogToRemove = await Blog.findById(request.params.id)
	if (!blogToRemove) {
		response.status(404).json({ error: 'requested blog entry not found' }).end()
	}
	if (!(blogToRemove.user.toString() === request.user.id.toString())) {
		response.status(403).json({ error: 'user is not permitted to delete this blog entry, because of missing ownership' })
	}

	await Blog.findByIdAndRemove({ '_id': request.params.id })
	response.status(204).end()
})

module.exports = blogRouter