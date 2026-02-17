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

    it('Should add item to cart', () => {
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

    it('Invalid login should show error message', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('invalid_user')
        cy.get('#password').type('invalid_password')
        cy.get('#login-button').click()

        //assertions
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Username and password do not match any user in this service')
    })

    it('Complete checkout flow', () => {
        cy.visit('https://www.saucedemo.com')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        // add item to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        // go to cart
        cy.get('[data-test="shopping-cart-badge"]').click()

        cy.url().should('include', '/cart.html')

        // click checkout
        cy.get("#checkout").click()

        cy.get('[data-test="firstName"]').type('Abdul')
        cy.get('[data-test="lastName"]').type('Qadir')
        cy.get('[data-test="postalCode"]').type('12345')

        cy.get('[data-test="continue"]').click()

        cy.get('[data-test="finish"]').click()

       cy.get('[data-test="complete-header"]').should('be.visible')


    })

    it("Remove Item from Cart", () => {
        cy.visit('https://www.saucedemo.com')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-badge"]').click()
        cy.url().should('include', '/cart.html')

        // remove item from cart
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    
        // assertions
        cy.get('.shopping_cart_link').should('not.contain', '1')
        cy.get('.shopping_cart_badge').should('not.exist')
    })

    it('should sort products by price low to high', () => {
        cy.visit('https://www.saucedemo.com')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        // Sort products
        cy.get('[data-test="product-sort-container"]').select('lohi')

        // Verify all prices are in ascending order
        cy.get('.inventory_item_price').then(($prices) => {
            const prices = [...$prices].map(el => 
            parseFloat(el.innerText.replace('$', ''))
            )
            for (let i = 1; i < prices.length; i++) {
            expect(prices[i]).to.be.gte(prices[i - 1]) 
            }
        })
        })

    it('logout should redirect to login page', () => {
        cy.visit('https://www.saucedemo.com')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        // open menu
        cy.get('#react-burger-menu-btn').click()
        // click logout
        cy.get('#logout_sidebar_link').click()
        // assertions
        cy.url().should('include', 'https://www.saucedemo.com/')
        cy.get('#login-button').should('be.visible')
        })
    })