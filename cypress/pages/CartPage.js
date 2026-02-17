class CartPage {
    //selectors

    elements = {
        checkoutButton: () => cy.get('#checkout'),
        removeBackpack: () => cy.get('[data-test="remove-sauce-labs-backpack"]'),
    }

    //actions
    proceedToCheckout(){
        this.elements.checkoutButton().click()
    }

    removeBackpack(){
        this.elements.removeBackpack().click()
    }

    //assertions
    verifyPageLoaded(){
        cy.url().should('include', '/cart.html')
    }
}

export default CartPage