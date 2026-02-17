class CheckoutPage {
    
    //selectors
    elements = {
        firstNameInput:  () => cy.get('[data-test="firstName"]'),
        lastNameInput:   () => cy.get('[data-test="lastName"]'),
        postalCodeInput: () => cy.get('[data-test="postalCode"]'),
        continueButton:  () => cy.get('[data-test="continue"]'),
        finishButton:    () => cy.get('[data-test="finish"]'),
        successHeader:   () => cy.get('[data-test="complete-header"]'),
    }

    //actions
    fillCustomerInfo(firstName, lastName, postalCode){
        this.elements.firstNameInput().type(firstName)
        this.elements.lastNameInput().type(lastName)
        this.elements.postalCodeInput().type(postalCode)
        this.elements.continueButton().click()
    }

    finishOrder(){
        this.elements.finishButton().click()
    }

    //assertions
    verifyOrderComplete(){
        this.elements.successHeader().should('be.visible').and('contain', 'Thank you for your order!') 
    }
}

export default CheckoutPage