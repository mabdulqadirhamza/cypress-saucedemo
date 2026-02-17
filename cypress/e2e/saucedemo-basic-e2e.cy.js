import LoginPage from "../pages/LoginPage";
import InventoryPage from "../pages/InventoryPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

const loginPage = new LoginPage()
const inventoryPage = new InventoryPage()
const cartPage = new CartPage()
const checkoutPage = new CheckoutPage()

describe('SauceDemo - E2E Flow', () => {

    it('Should login successfully with valid credentials', () => {
        loginPage.Login(
            Cypress.env('username'),
            Cypress.env('password')
        )
        inventoryPage.verifyPageLoaded()
    });

    it('Should add item to cart', () => {
        loginPage.Login(
            Cypress.env('username'),
            Cypress.env('password')
        )
        inventoryPage.addBackpackButton()
        inventoryPage.verifyCartBadgeVisible()
    })

    it('Invalid login should show error message', () => {
        loginPage.Login(
            Cypress.env('invalidUsername'),
            Cypress.env('invalidPassword')      
        )
        loginPage.verifyErrorMessage('Username and password do not match any user in this service')
    })

    it('Complete checkout flow', () => {
        loginPage.Login(
            Cypress.env('username'),
            Cypress.env('password')
        )
        inventoryPage.addBackpackButton()
        inventoryPage.goToCart()
        cartPage.verifyPageLoaded()
        cartPage.proceedToCheckout()
        checkoutPage.fillCustomerInfo('Abdul', 'Qadir', '12345')
        checkoutPage.finishOrder()
        checkoutPage.verifyOrderComplete()
     })

    it("Remove Item from Cart", () => {
        loginPage.Login(
            Cypress.env('username'),
            Cypress.env('password')
        )   
        inventoryPage.addBackpackButton()
        inventoryPage.goToCart()
        cartPage.verifyPageLoaded()
        cartPage.removeBackpack()
        inventoryPage.verifyCartEmpty()
    })

    it('should sort products by price low to high', () => {
        loginPage.Login(
            Cypress.env('username'),
            Cypress.env('password')
        )   
        inventoryPage.sortBy('lohi')
        inventoryPage.verifySortedByPriceLowToHigh()
    })

    it('logout should redirect to login page', () => {
        loginPage.Login(
            Cypress.env('username'),  
            Cypress.env('password')
        )   
        inventoryPage.logout()
        cy.url().should('include', 'https://www.saucedemo.com/')
        loginPage.elements.Loginbutton().should('be.visible')
        })
    })