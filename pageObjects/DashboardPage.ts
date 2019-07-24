import {Selector, t} from "testcafe";
import CutomLogger from "../log";
import BasePage from "./BasePage";

export default class DashboarPage extends BasePage {
    private queryLink = Selector(".nav-menu__link").nth(0);
    private userBadgeBtn = Selector(".user-icon");
    private dateFormat = Selector(".k-input");
    private userBadgeDateFmt = Selector("#dateFormats").find("span").nth(1);
    private loggedInUserName = Selector(".popup-content__username-hover");
    private defaultCulture = Selector(".popup-content > span:nth-child(3)");
    private signoutLnk = Selector(".popup-content__link");
    private bellIconBtn = Selector(".notification-icon");
    private messageCenterLnk = Selector(".popup-content__notification-hover");
    private queryListWindow = Selector(".ca-query-list").with({timeout: 70000});
    private queryResultsWindow = Selector(".ca-message-center-results-placeholder").with({timeout: 70000});
    private pendingRulesValidationHeading = Selector(".ca-tree-view__item").find("span").withText("Pending Rules Validation");
    private reviewMessagesHeading = Selector(".ca-tree-view__item").find("span").withText("Review Messages");
    private rulesMessageArchiveHeading = Selector(".ca-tree-view__item").find("span").withText("Rules Message Archive");
    private rulesMessageLogHeading = Selector(".ca-tree-view__item").find("span").withText("Rules Message Log");
    private signOutMessage = Selector(".main > h2:nth-child(1)");

    public async navigateToItemMenu(itemName: string) {
        await t.click(Selector("span").withText(itemName));
        CutomLogger.logger.log("info", "User has clicked on '" + itemName + "' item on Docketing Portal Menu Bar");
    }

    public async isNotExistsItemMenu(itemName: string) {
        await t.expect(Selector("span").withText(itemName).exists).notOk();
        CutomLogger.logger.log("info", "The '" + itemName + "' item not exists on Docketing Portal Menu Bar");
    }

    public async navigateToFlyoutItemMenu(flyoutMenuItemName: string) {
        await t.click(Selector(".ca-flyout-menu").find("div").withText(flyoutMenuItemName));
        CutomLogger.logger.log("info", "User has clicked on '" + flyoutMenuItemName + "'");
    }

    public async validateUserBadgeOptions(username, dateFormat, culture) {
        CutomLogger.logger.log("info", "Validate User Badge Options");
        await t
            .click(this.userBadgeBtn)
            .expect(this.loggedInUserName.textContent).eql(username);
        CutomLogger.logger.log("info", "UserName: " + await this.loggedInUserName.textContent);
        await t.expect(this.dateFormat.textContent).eql(dateFormat);
        CutomLogger.logger.log("info", "Date Format: " + await this.dateFormat.textContent);
        await t.expect(this.defaultCulture.textContent).eql(culture);
        CutomLogger.logger.log("info", "Default culture: " + await this.defaultCulture.textContent);
        await t.expect(this.signoutLnk.exists).ok();
    }

    public async validateDateFmtInUserBadge() {
        await t.click(this.queryLink);
        await t.click(this.userBadgeBtn);
        const badgeDateValue = await Selector(this.userBadgeDateFmt).textContent;
        await t.expect(this.userBadgeDateFmt.innerText).eql("MM/dd/yyyy");
        CutomLogger.logger.log("info", "The date format has displayed in the user badge is: " + badgeDateValue);
    }

    public async changeDateFmt() {
        let dFormat = await this.dateFormat.textContent;
        CutomLogger.logger.log("info", "Change Date format. Current: " + dFormat);
        await t
            .click(Selector(".k-i-arrow-s.k-icon"))
            .click(Selector(".k-list.k-reset").find("li").withText("M/d/yyyy").nth(0))
            .expect(Selector('[class^="ca-notification-message__container ca-notification"]').exists).ok();

        let ndFormat = await this.dateFormat.textContent;
        CutomLogger.logger.log("info", "New Date format: " + ndFormat);
    }

    public async validateDefaultCultureInUserBadge() {
        await t.click(this.queryLink);
        await t.click(this.userBadgeBtn);
        const defaultCultureValue = await Selector(this.defaultCulture).textContent;
        await t.expect(this.defaultCulture.innerText).eql("(en-US)");
        CutomLogger.logger.log("info", "The default culture displayed for logged in user is: " + defaultCultureValue);
    }

    public async validateLoggedUserNameInUserBadge(userName: string) {
        const user = userName.toString();
        await t.click(this.queryLink);
        await t.click(this.userBadgeBtn);
        const loggedInUserNameValue = await Selector(this.loggedInUserName).textContent;
        await t.expect(loggedInUserNameValue).eql(userName);
        CutomLogger.logger.log("info", "The logged in user name displayed as: " + loggedInUserNameValue);
    }

    public async validateSignoutBtnInUserBadge() {
        await t.click(this.queryLink);
        await t.click(this.userBadgeBtn);
        const signOutLnkValue = await Selector(this.signoutLnk).textContent;
        // await t .expect(this.signoutLnk.innerText).eql(signOutLnkValue);
        CutomLogger.logger.log("info", "The sign out link  displayed for logged in user is:" + signOutLnkValue);

    }

    public async signoutUserFromPortal() {
        await t.click(this.queryLink);
        await t.click(this.userBadgeBtn);
        await t.click(this.signoutLnk);
        CutomLogger.logger.log("info", "User has successfully signout from the portal");

    }

    public async validateDocumentExport() {
        let filename = "C:/Users/u6040409.LTPB/Downloads/ExportedFile11.xlsx";
        let fs = require("fs");
        console.log(fs.existsSync(filename));
        await t.expect(fs.existsSync(filename)).eql(true);
    }

    public async validateBellIconAndMessageCenter() {
        await t.click(this.bellIconBtn);
        CutomLogger.logger.log("info", "The bell icon button is present and user is able to click on it");

        const msgCenterValue = await Selector(this.messageCenterLnk).textContent;
        await t.expect(this.messageCenterLnk.innerText).eql(msgCenterValue);
        CutomLogger.logger.log("info", "The  link displayed as: " + msgCenterValue);

        await t.click(this.messageCenterLnk);
        t.wait(4000);
        await t.expect(Selector(this.queryListWindow).exists).ok();
        await t.expect(Selector(this.queryResultsWindow).exists).ok();
        CutomLogger.logger.log("info", "The page contains Query List and Page results windows");
    }

    public async validateQueryListSection() {
        await t.click(this.queryLink);
        await t.click(this.bellIconBtn);
        await t.click(this.messageCenterLnk);

        await t.expect(Selector(this.pendingRulesValidationHeading).exists).ok();
        await t.expect(Selector(this.reviewMessagesHeading).exists).ok();
        await t.expect(Selector(this.rulesMessageArchiveHeading).exists).ok();
        await t.expect(Selector(this.rulesMessageLogHeading).exists).ok();
        CutomLogger.logger.log("info", "The following Query List are present in Query list:Pending Rules Validation,Rules Message Archive");
    }

    public async validateSignoutPage() {
        await t.expect(this.signOutMessage).ok();
        await t.expect(this.signOutMessage.innerText).eql("You have successfully signed out");
    }
}
