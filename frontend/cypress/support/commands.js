Cypress.Commands.add('login', ({ username, password }) => {
	cy.request('POST', 'http://localhost:3003/api/login', {
		username, password
	}).then(({ body }) => {
		console.log(body)
		localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
		cy.visit('http://localhost:3000')
	})
})

Cypress.Commands.add('createBlogEntry', ({ title, author, url }) => {
	cy.request({
		url: `${ Cypress.env('BACKEND') }/blogs`,
		method: 'POST',
		body: {
			title, author, url
		},
		headers: {
			'Authorization': `Bearer ${ JSON.parse(localStorage.getItem('loggedBlogAppUser')).token }`
		}
	})

	cy.visit('')

})