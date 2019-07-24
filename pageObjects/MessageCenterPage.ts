import { Selector, t } from "testcafe";
import CutomLogger from "../log";
import BasePage from "./BasePage";

export default class MessageCenterPage extends BasePage {

    public queryLink = Selector(".nav-menu__link").nth(0);
    public bellIconBtn = Selector(".notification-icon");
    public messageCenterLnk = Selector(".popup-content__notification-hover");
    public queryListWindow = Selector(".ca-query-list");
    public queryResultsWindow = Selector(".ca-message-center-results-placeholder");
    public pendingRulesValidationHeading = Selector(".ca-tree-view__item").find("span").withText("Pending Rules Validation");
    public reviewMessagesHeading = Selector(".ca-tree-view__item").find("span").withText("Review Messages");
    public rulesMessageArchiveHeading = Selector(".ca-tree-view__item").find("span").withText("Rules Message Archive");
    public rulesMessageLogHeading = Selector(".ca-tree-view__item").find("span").withText("Rules Message Log");
    public patentsLnk = Selector(".ca-tree-view__item").find("span").withText("Patents");

    
    //message center regression locators - kumar kullan

    public textinQueryResultWindow = Selector("body > ngx-layout > div > div > div > query > ca-splitter > div > ca-splitter-master-tab > div > ng-component > div");
    public openResultRecord = Selector("#ca-grid-id > div > kendo-grid-list > div.k-grid-content-locked > div > table > tbody > tr >td:nth-child(2) > navigation-result-value > a").nth(0);

    public async validateBellIconAndMessageCenter() {
        await t.click(this.bellIconBtn);
        CutomLogger.logger.log("info", "The bell icon button is present and user is able to click on it");

        const msgCenterValue = await Selector(this.messageCenterLnk).textContent;
        await t.expect(this.messageCenterLnk.innerText).eql(msgCenterValue);
        CutomLogger.logger.log("info", "The  link displayed as: " + msgCenterValue);

        await t.click(this.messageCenterLnk)
            .expect(Selector(this.queryListWindow).exists).ok()
            .expect(Selector(this.queryResultsWindow).exists).ok();
        CutomLogger.logger.log("info", "The page contains Query List and Page results windows");
    }

    public async validateQueryListSection() {
        await t
            .click(this.queryLink)
            .click(this.bellIconBtn)
            .click(this.messageCenterLnk)
            .expect(Selector(this.pendingRulesValidationHeading).exists).ok()
            .expect(Selector(this.reviewMessagesHeading).exists).ok()
            .expect(Selector(this.rulesMessageArchiveHeading).exists).ok()
            .expect(Selector(this.rulesMessageLogHeading).exists).ok();
        CutomLogger.logger.log("info", "The following Query List are present in Query list:Pending Rules Validation,Rules Message Archive");
    }
    public async validateRunQuery() {
        await t.click(this.patentsLnk)
            .click(this.queryLink);
        CutomLogger.logger.log("info", "The patents query results page has displayed");
    }

    //message center regression methods - kumar kullan
    public async isNotificationPresent_No() {
        await t.expect(this.bellIconBtn.exists).notOk();
        CutomLogger.logger.log("info", "There is no notification icon (user does NOT have permission to any message center query)");
    }

    public async isNotificationPresent_Yes() {
        await t.expect(this.bellIconBtn.exists).ok();
        CutomLogger.logger.log("info", "There is a notification icon (user DOES have permission to some message center query).");
    }

    public async clkOnNotificationIcon() {
        await t.click(this.bellIconBtn)
        CutomLogger.logger.log("info", "The Flyout is displayed");

        const msgCenterValue = await Selector(this.messageCenterLnk).textContent;
        await t.expect(this.messageCenterLnk.innerText).eql(msgCenterValue);
        CutomLogger.logger.log("info", "link with label displayed as: " + msgCenterValue);       
    }

    public async clkOnMessageCenterLnk() {
        await t.click(this.bellIconBtn)
        CutomLogger.logger.log("info", "Flyout is closed. Message Center screen replaces current screen. There is NO item selected in the menu bar"); 
    }
    public async verifyMsgCenterScreen() {
        await t .click(this.bellIconBtn)
                .click(this.messageCenterLnk)
                .expect(Selector(this.queryListWindow).exists).ok()
                .expect(Selector(this.queryResultsWindow).exists).ok(); 
        CutomLogger.logger.log("info", "Message Center screen have the same layout as the Query screen, with the exception that the Query List does NOT have a search field. The Query List is expanded by default");
        CutomLogger.logger.log("info", "The text is displayed in place of the grid and Criteria Builder as please select a query to view the results"); 
}

public async verifyQueryList() {     
    await t.click(this.pendingRulesValidationHeading)           
    CutomLogger.logger.log("info", "Query List have a Message Center node, and it is expanded by default."); 

    const availableQueryList = await Selector(this.queryListWindow).textContent;
    CutomLogger.logger.log("info", "The Query List displayed as: " + availableQueryList); 

    await t.click(this.patentsLnk)
            .click(this.queryLink);
        CutomLogger.logger.log("info", "The patents query results page has displayed");     
}

public async clkPatentInMessageCenterQueryList() {     
    await t .click(this.bellIconBtn)
            .click(this.messageCenterLnk)   
            .click(this.patentsLnk);   
}

public async clkPatentQueryResultRecord() {     
    await t .click(this.openResultRecord)
            
}

}
