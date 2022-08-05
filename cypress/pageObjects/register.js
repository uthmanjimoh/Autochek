class Register
{
    getPopupCancel()
    {
        return cy.get("#__next>div>div:nth-child(3)>div:nth-child(4)>div:nth-child(2)>div>div:nth-child(1)")
    }
    registerLink()
    {
        return cy.get('a[href*="/register"]')
    }
    firstNameField()
    {
        return cy.get('input[name="firstname"]')
    }
    lastNameField()
    {
        return cy.get('input[name="lastname"]')
    }
    emailField()
    {
        return cy.get('input[name="email"]')
    }
    phoneNumberField()
    {
        return cy.get('input[type="tel"]')
    }
    passwordField()
    {
        return cy.get('input[name="password"]')
    }
    referralCodeField()
    {
        return cy.get('input[name="referrer_code"]')
    }
    registerButton()
    {
        return cy.get('button[type="submit"]')
    }
    errorPopup()
    {
        return cy.get('div[role="dialog"]')
    }
    errorOkButton()
    {
        return cy.get('div[role="dialog"] button:nth-child(2)')
    }

    getContent()
    {
        return cy.get('#swal2-content')
    }
    

}
export default Register;