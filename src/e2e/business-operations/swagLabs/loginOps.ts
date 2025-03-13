import { DataTable } from "@badeball/cypress-cucumber-preprocessor";
import loginPo from "../../../support/page-objects/swagLabs/loginPo";
class LoginOps {
    loginToApplication(credentials: DataTable) {
        const userData = credentials.rowsHash()
        loginPo.getLoginPageHeading.should('be.visible')
        loginPo
            .enterUsername(userData['username'])
            .enterPassword(userData['password'])
            .submitLogin()
        
    }
}
export default new LoginOps()