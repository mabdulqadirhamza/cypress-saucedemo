describe('SauceDemo - Basic E2E Flow', () => {

    it('Should login successfully with valid credentials', () => {
        // 1. visit the site first
        cy.visit('https://www.saucedemo.com/')

        //2. fill in username
        cy.get('#user-name').type('standard_user')

        // 3. fill in password
        cy.get('#password').type('secret_sauce')

        //4. click login
        cy.get('#login-button').click()

        // assertions
        cy.url().should('include', '/inventory.html')
        cy.get('.title').should('contain', 'Products')

    });

    it.only('Should add item to cart', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        // add item to cart
        cy.get("#add-to-cart-sauce-labs-backpack").click()
        
        //assertions
        cy.get('.shopping_cart_link').should('contain', '1')
        cy.get('.shopping_cart_badge').should('be.visible')
    })

    it.only('Invalid login should show error message', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('invalid_user')
        cy.get('#password').type('invalid_password')
        cy.get('#login-button').click()

        //assertions
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Username and password do not match any user in this service')
})
})