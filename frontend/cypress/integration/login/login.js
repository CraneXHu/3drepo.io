import { When, Then } from 'cypress-cucumber-preprocessor/steps'
When('I login', () => {
  cy.loginWith({ username: 'teamSpace1', password: 'password'})
})
Then('the url is {word}', (url) => {
  cy.url()
    .should('eq', `${Cypress.config().baseUrl}${url}`)
})
Then('I\'m logged', () => {
	cy.get('#sidebarUserInfo')
		.should('contain', 'Teamspace One')
})

