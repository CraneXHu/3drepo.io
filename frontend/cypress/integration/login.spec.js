cy.loginWith({
	username: 'teamSpace1',
	password: 'password'
  })
	.url()
	.should('eq', '/dashboard/teamspaces')
	.get('#sidebarUserInfo')
	.should('contain', 'Teamspace One');
