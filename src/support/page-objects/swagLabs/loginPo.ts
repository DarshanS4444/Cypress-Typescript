class LoginPo {
    get getUsernameInput() {
        return cy.get('#user-name')
    }
    get getPasswordInput() {
        return cy.get('#password')
    }
    get getLoginButton() {
        return cy.get('[data-test="login-button"]')
    }
    get getLoginPageHeading() {
        return cy.get('.login_logo')
    }
    enterUsername(username: string) {
        this.getUsernameInput.type(username)
        return this
    }
    enterPassword(password: string) {
        this.getPasswordInput.type(password)
        return this
    }
    submitLogin() {
        this.getLoginButton.click()
        return this
    }
}
export default new LoginPo()