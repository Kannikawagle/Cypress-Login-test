/// <reference types="cypress" />

describe('Login feature test',() =>{
    let testData
    beforeEach(function (){
        cy.visit('https://the-internet.herokuapp.com/login'); // opens website
        cy.fixture('loginValidation').then(function (loginValidation){
            let testData= loginValidation
            return testData
        })
    })
    it('should login with correct username and password',() =>{
        cy.get('input#username').clear().type(correctusername);
        cy.get('input#password').type('SuperSecretPassword!').type('{enter}');

       // cy.get('#flash-messages')
        cy.get('#flash')
        .should('have.class','flash success')
        cy.contains('You logged into a secure area!');


         cy.get('#content')
        // .get('div').should('have.class','example' )
         .get('a').should('have.class', 'button secondary radius')
         cy.contains('Logout').click();
        //}
    })
    it('should give error message with wrong username',() =>{
        // const username= Cypress.env('tomsmith');
        // const password= Cypress.env('SuperSecretPassword!');
         cy.get('input#username').clear().type('tomsmith1');
         cy.get('input#password').type('SuperSecretPassword!').type('{enter}')
         cy.get('#flash')
         .should('have.class','flash error')
         cy.contains('Your username is invalid!');
     })
     it('should give error message with wrong password',() =>{
         cy.get('input#username').clear().type('tomsmith');
         cy.get('input#password').type('SuperSecretPassword!!').type('{enter}');
         cy.get('#flash')
         .should('have.class','flash error')
         cy.contains('Your password is invalid! '); 
     })
})