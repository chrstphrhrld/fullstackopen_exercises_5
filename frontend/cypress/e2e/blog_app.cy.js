const user = [
	{
		name: 'admin',
		username: 'root',
		password: 'salainen'
	},
	{
		name: 'odmin',
		username: 'groot',
		password: 'galainen'
	}
]

const blogEntry = [
	{
		title: 'My favorite blog',
		author: 'Reiner Kallmum',
		url: 'www.lecker.org'
	},
	{
		title: 'My second favorite blog',
		author: 'Reiner Kallmum',
		url: 'www.lecker.org'
	},
	{
		title: 'My third favorite blog',
		author: 'Reiner Kallmum',
		url: 'www.lecker.org'
	}
]


describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', `${ Cypress.env('BACKEND') }/testing/reset`)
		cy.request('POST', `${ Cypress.env('BACKEND') }/users`, user[0])
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('log in to the application').click()
		cy.contains('username')
		cy.contains('password')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.contains('log in to the application').click()
			cy.contains('username').children().type('root')
			cy.contains('password').children().type('salainen')
			cy.contains('login').click()
			cy.contains(`${ user[0].name } is logged in`)
		})

		it('fails with wrong credentials', function () {
			cy.contains('log in to the application').click()
			cy.contains('username').children().type('root')
			cy.contains('password').children().type('foo')
			cy.contains('login').click()
			cy.contains('wrong username or password').should('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid')
		})

		describe('When logged in', function () {
			beforeEach(function () {
				cy.login({ username: 'root', password: 'salainen' })
				cy.visit('http://localhost:3000')
			})

			it('A blog can be created', function () {
				cy.contains('new blog entry').click()
				cy.contains('title').children().type(blogEntry[0].title)
				cy.contains('author').children().type(blogEntry[0].author)
				cy.contains('url').children().type(blogEntry[0].url)
				cy.get('button').contains('create').click()
				cy.contains(blogEntry[0].title)
				cy.contains(`${ blogEntry[0].title } by ${ blogEntry[0].author } added`)
					.and('have.css', 'color', 'rgb(0, 128, 0)')
			})

			it('A user can like a blog entry', function () {
				cy.createBlogEntry(blogEntry[0])
				cy.contains('view').click()
				cy.contains('like').click()
				cy.contains('1')
			})

			describe('A created blog entry can only be deleted by creator', function () {
				beforeEach(function () {
					cy.createBlogEntry(blogEntry[0])
					cy.createBlogEntry(blogEntry[1])
					cy.createBlogEntry(blogEntry[2])
				})

				it('only a user that created the blog entry can delete it', function () {
					cy.contains('view').then(button => {
						cy.wrap(button[0]).click()
					})

					cy.contains('remove').click()
				});

				it('only the creator of a blog entry can delete it', function () {
					cy.contains('logout').click()

					cy.request('POST', `${ Cypress.env('BACKEND') }/users`, user[1])
					cy.login({ username: user[1].username, password: user[1].password })

					cy.contains('view').then(button => {
						cy.wrap(button[0]).click()
					})

					cy.contains('remove').and('have.css', 'display', 'none')
				})

				it('a blogs should be sorted by their likes', function () {
					cy.contains(blogEntry[0].title).children().click()
					cy.contains('like').click()
					cy.wait(500)
					cy.contains('like').click()
					cy.contains('hide').click()

					cy.contains(blogEntry[1].title).children().click()
					cy.contains('like').click()
					cy.wait(500)
					cy.contains('like').click()
					cy.wait(500)
					cy.contains('like').click()
					cy.contains('hide').click()

					cy.get('.blog-entry').eq(0).should('contain', blogEntry[1].title)
					cy.get('.blog-entry').eq(1).should('contain', blogEntry[0].title)
				})
			})
		})
	})
})
