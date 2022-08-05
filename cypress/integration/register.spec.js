///<reference types = "cypress"/>

import register from "../pageObjects/register.js"
import { faker } from '@faker-js/faker';

const data = require('../fixtures/jsonData.config.json')
const existing_email = data.register_data.existing_email
const existing_phoneNo = data.register_data.existing_phoneNo
const registerPage = new register()
const email = faker.internet.exampleEmail()
const phoneNumber = faker.phone.number('90########')
let usedEmail, usedNumber;

describe("Register", ()=>{
    it("should be able to register a user successfully", ()=>{
        cy.visit("/")
        registerPage.getPopupCancel().click()
        registerPage.registerLink().click()
        registerPage.registerButton().should('be.disabled')
        registerPage.firstNameField().type(faker.name.firstName())
        registerPage.lastNameField().type(faker.name.findName())
        registerPage.emailField().type(email).then(($el)=>{
            usedEmail= $el.val()
            
        })
        cy.log(usedEmail)
        registerPage.phoneNumberField().type(phoneNumber).then(($el)=>{
            usedNumber = $el.val()
            
        })
        cy.log(usedNumber)
        registerPage.passwordField().type(faker.internet.password(8, true, /[A-Z]/, 'A'))

        registerPage.registerButton().should('be.enabled')
        registerPage.registerButton().click()  
        cy.contains("Congratulations").should('be.visible')
    });

    it("should not register with invalid email", ()=>{
        cy.visit("/")
        registerPage.getPopupCancel().click()
        registerPage.registerLink().click()
        registerPage.registerButton().should('be.disabled')
        registerPage.firstNameField().type(faker.name.firstName())
        registerPage.lastNameField().type(faker.name.findName())
        registerPage.emailField().type(".test@example.com")
        registerPage.phoneNumberField().type(faker.phone.number('90########'))
        registerPage.passwordField().type(faker.internet.password())
        registerPage.registerButton().should('be.enabled')
        registerPage.registerButton().click()
        registerPage.errorPopup().should('be.visible')
        registerPage.errorOkButton().click()    
        
        registerPage.emailField().clear().type("test@com")
        registerPage.registerButton().click()
        registerPage.errorPopup().should('be.visible')
        registerPage.errorOkButton().click()    
        registerPage.errorPopup().should('not.be.visible')
    })

    it("should not register a user with an existing email", ()=>{
        cy.visit("/")
        registerPage.getPopupCancel().click()
        registerPage.registerLink().click()
        registerPage.registerButton().should('be.disabled')
        registerPage.firstNameField().type(faker.name.firstName())
        registerPage.lastNameField().type(faker.name.findName())
        registerPage.emailField().type(existing_email)
        registerPage.phoneNumberField().type(faker.phone.number('90########'))
        registerPage.passwordField().type(faker.internet.password())

        registerPage.registerButton().should('be.enabled')
        registerPage.registerButton().click()
        registerPage.getContent().should('be.visible').contains('Email already exist')
        cy.contains("Email already exist").should('be.visible')    

    });

    it("should not register a user with an existing phone number", ()=>{
        cy.visit("/")
        registerPage.getPopupCancel().click()
        registerPage.registerLink().click()
        registerPage.registerButton().should('be.disabled')
        registerPage.firstNameField().type(faker.name.firstName())
        registerPage.lastNameField().type(faker.name.findName())
        registerPage.emailField().type(faker.internet.exampleEmail())
        registerPage.phoneNumberField().type(existing_phoneNo)
        registerPage.passwordField().type(faker.internet.password())

        registerPage.registerButton().should('be.enabled')
        registerPage.registerButton().click() 
        registerPage.errorPopup().should('be.visible')
        cy.contains("Phone number already exist").should('be.visible')       
    });

    it("should not register an invalid password", ()=>{
        cy.visit("/")
        registerPage.getPopupCancel().click()
        registerPage.registerLink().click()
        registerPage.registerButton().should('be.disabled')
        registerPage.firstNameField().type(faker.name.firstName())
        registerPage.lastNameField().type(faker.name.findName())
        registerPage.emailField().type(faker.internet.exampleEmail())
        registerPage.phoneNumberField().type(faker.phone.number('90########'))
        registerPage.passwordField().clear().type("abcd")

        registerPage.registerButton().should('be.enabled')
        registerPage.registerButton().click()
        registerPage.errorPopup().should('be.visible').contains('Password must be at least 5 characters with 1 uppercase')
        registerPage.errorOkButton().click()    
        
        registerPage.passwordField().clear().type("abcde")
        registerPage.registerButton().click()
        registerPage.errorPopup().should('be.visible').contains('Password must be at least 5 characters with 1 uppercase')
        registerPage.errorOkButton().click()    
        cy.wait(100)
        registerPage.passwordField().clear({force:true}).type("Abcd")
        registerPage.registerButton().click()
        registerPage.errorPopup().should('be.visible').contains('Password must be at least 5 characters with 1 uppercase')
        registerPage.errorOkButton().click()    
        

    });

    
})