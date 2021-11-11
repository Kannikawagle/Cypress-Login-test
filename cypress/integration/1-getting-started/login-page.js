/// <reference types="cypress" />

describe('Login feature test', () => {
    var testData;
    beforeEach(function () {
        //open website
        cy.visit('https://the-internet.herokuapp.com/login'); 
        cy.fixture('loginValidation').then(loginValidation =>{
            this.loginValidation = loginValidation

        })
    })
    it('should have text box to enter username and password and login button', function(){
        cy.get('#username');
        cy.contains('Username');
        cy.get('#password');
        cy.contains('Password');
        cy.get('#login')
        .get('button').should('have.class', 'radius').contains("Login")
    })
    it('should login with correct username and password', function() {
        //passing values from fixtures 
        cy.get('input#username').clear().type(this.loginValidation[0].Correctusername);
        cy.get('input#password').clear().type(this.loginValidation[0].Correctpassword).type('{enter}');
        //checks for Flash success message    
        cy.get('#flash')
            .should('have.class', 'flash success')
        cy.contains('You logged into a secure area!');
        //log out
        cy.get('#content')
            .get('a').should('have.class', 'button secondary radius')
        cy.contains('Logout').click();
    })
    it('should give error message with wrong username', function() {
         //passing values from fixtures 
        cy.get('input#username').clear().type(this.loginValidation[1].Wrongusername);
        cy.get('input#password').clear().type(this.loginValidation[1].Correctpassword).type('{enter}');
        cy.get('#flash')
            .should('have.class', 'flash error')
        cy.contains('Your username is invalid!');
    })
    it('should give error message with wrong password', function() {
         //passing values from fixtures 
        cy.get('input#username').clear().type(this.loginValidation[2].Correctusername);
        cy.get('input#password').clear().type(this.loginValidation[2].Wrongpassword).type('{enter}');
        //checks for Flash error message
        cy.get('#flash')
            .should('have.class', 'flash error')
        cy.contains('Your password is invalid! ');
    })
    it('should not allow user to login if username is left blank', function(){
         //passing values from fixtures 
        cy.get('input#password').clear().type(this.loginValidation[2].Wrongpassword).type('{enter}');
        //checks for Flash error message
        cy.get('#flash')
            .should('have.class', 'flash error')
        cy.contains('Your username is invalid! ');
    })
    it('should not allow user to login if passsword is left blank', function(){
         //passing values from fixtures 
        cy.get('input#username').clear().type(this.loginValidation[2].Correctusername).type('{enter}');
        //checks for Flash error message
        cy.get('#flash')
            .should('have.class', 'flash error')
        cy.contains('Your password is invalid! ');
    })
    it('should not allow user to login if username and passsword is left blank', function(){
         cy.get('#login')
        .get('button').should('have.class', 'radius').type('{enter}')
        //checks for Flash error message
        cy.get('#flash')
            .should('have.class', 'flash error')
        cy.contains('Your username is invalid! ');
    })
})