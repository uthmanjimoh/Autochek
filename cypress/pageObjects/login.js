class login
{
    getPopupCancel()
    {
        return cy.get("#__next>div>div:nth-child(3)>div:nth-child(4)>div:nth-child(2)>div>div:nth-child(1)")
    }
    signInLink()
    {
        return cy.get('a[href*="/login"]')
    }
    emailField()
    {
        return cy.get('input[name="email"]')
    }
    passwordField()
    {
        return cy.get('input[name="password"]')
    }
    loginBtn()
    {
        return cy.get('button[type="submit"]')
    }
    errorPopup()
    {
        return cy.get('div[role="dialog"]')
    }
    getSignOutBtn()
    {
        return cy.get('a[href*="/profile"]')
    }

}
export default login