class LoginPage{
    //selectors
    elements = {
        usernameInput: () => cy.get('#user-name'),
        passwordInput: () => cy.get('#password'),
        Loginbutton: () => cy.get('#login-button'),
        errorMessage: () => cy.get('[data-test="error"]')
    }

    visit(){
        cy.visit('/')
    }

    enterUsername(username){
        this.elements.usernameInput().type(username)
    }

    enterPassword(password){
        this.elements.passwordInput().type(password)
    }
    
    clickLogin(){
        this.elements.Loginbutton().click()
    }

    //combined login action
    Login(username, password){
        this.visit()
        this.enterUsername(username)
        this.enterPassword(password)
        this.clickLogin()
    }

    //assertions
    verifyErrorMessage(message){
        this.elements.errorMessage().should('be.visible').and('contain', message)
    }

    verifyOnLoginPage(url){
        cy.url().should('include', url)
        this.elements.Loginbutton().should('be.visible')
    }
}

export default LoginPage