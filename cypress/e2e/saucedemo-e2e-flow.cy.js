import LoginPage from "../pages/LoginPage";
import InventoryPage from "../pages/InventoryPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

const loginPage = new LoginPage()
const inventoryPage = new InventoryPage()
const cartPage = new CartPage()
const checkoutPage = new CheckoutPage()

describe('SauceDemo - POM E2E Flow', () => {

    beforeEach(() => {
        cy.fixture('testdata').as('testdata')
    })

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

    it('Invalid login should show error message', function() {
        loginPage.Login(
            Cypress.env('invalidUsername'),
            Cypress.env('invalidPassword')      
        )
        loginPage.verifyErrorMessage(this.testdata.errorMessages.invalidLogin)
    })

    it('Complete checkout flow', function() {
        loginPage.Login(
            Cypress.env('username'),
            Cypress.env('password')
        )
        inventoryPage.addBackpackButton()
        inventoryPage.goToCart()
        cartPage.verifyPageLoaded()
        cartPage.proceedToCheckout()
        checkoutPage.fillCustomerInfo(this.testdata.checkout.firstName, this.testdata.checkout.lastName, this.testdata.checkout.postalCode)
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

    it('logout should redirect to login page', function() {
        loginPage.Login(
            Cypress.env('username'),  
            Cypress.env('password')
        )   
        inventoryPage.logout()
        loginPage.verifyOnLoginPage(this.testdata.urls.loginPage)
        })
    })