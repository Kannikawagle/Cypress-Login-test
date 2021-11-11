describe('Login page title',() =>{
    it('Test loging page title', () =>{
        cy.visit('https://the-internet.herokuapp.com/login');
    })
    it('should login with correct username and password',() =>{
       // const username= Cypress.env('tomsmith');
       // const password= Cypress.env('SuperSecretPassword!');
        cy.get('input#username').clear().type('tomsmith');
        cy.get('input#password').type('SuperSecretPassword!').type('{enter}');

        cy.get('[id=flash-messages]')
        cy.get('[id=flash]')
        .should('have.class','flash success')
        cy.contains('You logged into a secure area!');

         cy.get('[id=content]')
         .get('div').should('have.class','example' )
         .get('a').should('have.class', 'button secondary radius')
         cy.contains('Logout').click();
    })
    it('should give error message with wrong username',() =>{
        // const username= Cypress.env('tomsmith');
        // const password= Cypress.env('SuperSecretPassword!');
         cy.get('input#username').clear().type('tomsmith1');
         cy.get('input#password').type('SuperSecretPassword!').type('{enter}');
         cy.get('[id=flash-messages]')
         cy.get('[id=flash]')
         .should('have.class','flash error')
         cy.contains('Your username is invalid!');
     })
     it('should give error message with wrong password',() =>{
        // const username= Cypress.env('tomsmith');
        // const password= Cypress.env('SuperSecretPassword!');
         cy.get('input#username').clear().type('tomsmith');
         cy.get('input#password').type('SuperSecretPassword!!').type('{enter}');
         cy.get('[id=flash-messages]')
         cy.get('[id=flash]')
         .should('have.class','flash error')
         cy.contains('Your password is invalid! ');
 
     })
})