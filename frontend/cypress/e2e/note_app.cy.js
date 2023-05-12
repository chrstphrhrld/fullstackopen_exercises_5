describe('Note ', function () {
	beforeEach(function () {
		cy.visit('')
		cy.request('POST', `${ Cypress.env('BACKEND') }/testing/reset`)
		const user = {
			name: 'Groot',
			username: 'root',
			password: 'salainen'
		}
		cy.request('POST', `${ Cypress.env('BACKEND') }/users`, user)
	})

	it('front page can be opened', function () {
		cy.contains('Notes')
		cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
	})

	it('login form can be opened', function () {
		cy.contains('login').click()
		cy.get('#username').type('root')
		cy.get('#password').type('salainen')
		cy.get('#login-button').click()

		cy.contains('Groot logged in')
	})

	describe('when logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'root', password: 'salainen' })
		})

		it('a new note can be created', function () {
			cy.contains('new note').click()
			cy.get('input').type('a note created by cypress')
			cy.contains('save').click()
			cy.contains('a note created by cypress')
		})

		describe('and several notes exists', function () {
			beforeEach(function () {
				cy.createNote({ content: 'first note', important: false })
				cy.createNote({ content: 'second note', important: false })
				cy.createNote({ content: 'third note', important: false })
			})

			// Note: this approach doesn't work if content is wrapped into span tag
			// it('one of those can be made important', function () {
			// 	cy.contains('second note')
			// 		.contains('make important')
			// 		.click()
			//
			// 	cy.contains('second note')
			// 		.contains('make not important')
			// })

			it('one of those can be made important', function () {
				cy.contains('second note').parent().find('button').as('theButton')
				cy.get('@theButton').click()
				cy.get('@theButton').should('contain', 'make not important')
			})
		})
	})

	it('login fails with wrong password', function () {
		cy.contains('login').click()
		cy.get('#username').type('root')
		cy.get('#password').type('wrong')
		cy.get('#login-button').click()

		cy.get('.error')
			.should('contain', 'Wrong Credentials')
			.and('have.css', 'color', 'rgb(255, 0, 0)')
			.and('have.css', 'border-style', 'solid')

		cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
	})
})