const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const blogs = require('../tests/blogs_helper')
const users = require('../tests/user_helper')

beforeEach(async () => {
	await User.deleteMany({})
	await User.insertMany(users.userEntries)
})

describe('should perform CRUD operations on users', () => {
	test('should create a unvalid user', async () => {
		const userToAdd = new User({
			username: 'ui',
			name: 'Rudi',
			password: 'superrudi'
		})

		await api.post('/api/users')
			.send(userToAdd)
			.expect(404)

		const userInDb = await api.get('/api/users')
		expect(userInDb.body).toHaveLength(users.userEntries.length)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
}, 10000)