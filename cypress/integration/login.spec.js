///<reference types = "cypress"/>
import login from "../pageObjects/login.js"


const signIn = new login()
const data = require('../fixtures/jsonData.config.json')
const valid_email = data.login_data.valid_email
const valid_password = data.login_data.valid_password
const invalid_email = data.login_data.incorrect_email
const invalid_password = data.login_data.incorrect_password

describe("Login", ()=>{
    it("should be able to login successfully", ()=>{
        cy.visit("/")
        signIn.getPopupCancel().click()
        signIn.signInLink().click()
        cy.url().should("include","login")
        signIn.emailField().clear().type(valid_email)
        signIn.passwordField().clear().type(valid_password)
        signIn.loginBtn().click()
        signIn.getPopupCancel().click()
        signIn.getSignOutBtn().should("be.visible")
    })
    it("should not login successfully with invalid email and password", ()=>{
        cy.visit("/")
        signIn.getPopupCancel().click()
        signIn.signInLink().click()
        cy.url().should("include","login")
        signIn.emailField().clear().type(invalid_email)
        signIn.passwordField().clear().type(invalid_password)
        signIn.loginBtn().click()
        signIn.errorPopup().should('be.visible')
        cy.contains("User not found. Please sign up").should('be.visible')
    })
    it("should not login successfully with valid email and blank password", ()=>{
        cy.visit("/")
        signIn.getPopupCancel().click()
        signIn.signInLink().click()
        cy.url().should("include","login")
        signIn.emailField().clear().type(valid_email)
        signIn.loginBtn().click()
        signIn.errorPopup().should('be.visible')
        cy.contains("Invalid Password").should('be.visible')
    })
    it("should not login successfully with blank email and valid password", ()=>{
        cy.visit("/")
        signIn.getPopupCancel().click()
        signIn.signInLink().click()
        cy.url().should("include","login")
        signIn.passwordField().clear().type(valid_password)
        signIn.loginBtn().click()
        signIn.errorPopup().should('be.visible')
        cy.contains("User not found. Please sign up").should('be.visible')
    })
    it("should not login successfully with blank email and password", ()=>{
        cy.visit("/")
        signIn.getPopupCancel().click()
        signIn.signInLink().click()
        cy.url().should("include","login")
        signIn.loginBtn().click()
        signIn.errorPopup().should('be.visible')
        cy.contains("User not found. Please sign up").should('be.visible')
    })
})