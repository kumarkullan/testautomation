import { Selector, t } from "testcafe";
import CutomLogger from "../log";
import BasePage from "./BasePage";

export default class LoginPage extends BasePage {

    public userNameField = Selector("#username-login-type-discovery");
    public passwordField = Selector("#password");
    public nextButton    = Selector("#button-discovery-next");
    public signinBtn     = Selector("#btnLoginSubmit");
    private placeHolderArea = Selector(".ca-query-results-placeholder");

    public async userLogin(username: string, password: string) {
        await t
            .typeText(this.userNameField, username)
            .click(this.nextButton)
            .typeText(this.passwordField, password)
            .click(this.signinBtn)
            .expect(this.placeHolderArea.exists).ok();
        CutomLogger.logger.log("info", "User Successfully logged into the Docketing Portal System");
    }
}
