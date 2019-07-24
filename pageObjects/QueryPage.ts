import { ClientFunction, Selector, t } from "testcafe";
import CutomLogger from "../log";
import BaseQueryPage from "./BaseQueryPage";

import { DocketingPortalApiUrls } from "../testData/urls";

export default class QueryPage extends BaseQueryPage {
    private collaborateLnk = Selector(".ca-flyout-menu__label").find("span").withText("Collaborate");
    private automationCollaborationProcessLnk = Selector(".ca-flyout-menu__item").withText("Email-Fengjie");
    private collaborateSelectRecordsOkPopUpMsg = Selector(".ca-modal-confirmation__button.ca-button--primary");
    private collaborateRecordsAddedConfirmationMsg = Selector(".ca-notification-message__container.ca-notification-message--information");

    private duplicateLnk = Selector(".ca-flyout-menu__label").find("span").withText("Duplicate");
    private duplicateTCloseBtn = Selector("#closeButton").find("i");
    private duplicateForm = Selector("#duplicateForm");

    private emailLnk = Selector(".ca-flyout-menu__label").find("span").withText("Email");
    private emailTemplateCancelBtn = Selector("#close");
    private emailTemplateSendBtn = Selector("#send");
    private formLetterLnk = Selector(".ca-flyout-menu__label").find("span").withText("Form Letter");
    private automationFormLetterTemplateLnk = Selector("div > ca-menu > ca-flyout-menu > div > ca-flyout:nth-child(3) > div > kendo-popup > div > div > div:nth-child(1) > div");

    private processRulesLnk = Selector(".ca-flyout-menu").find("div").withText("Process Rules").nth(0).find("div").nth(0);
    private processAddedConfirmationMsg = Selector("body > ca-notification-message > div > div > div > span");

    private reportsLnk = Selector(".ca-flyout-menu__label").find("span").withText("Report");
    private automationReportsLnk = Selector(".reportItem");

    private variablesLnk = Selector(".ca-flyout-menu").find("div").withText("Variable Link").nth(0).find("div").nth(0);
    private selectvariablesLink = Selector("div > ca-menu > ca-flyout-menu > div > ca-flyout:nth-child(3) > div > kendo-popup > div > div > div:nth-child(3) > div");

    private searchQueryField = Selector(".ca-textbox__input ng-pristine ng-valid ng-touched");
    private queryListTree = Selector(".cls");
    private queryResultsArea = Selector(".ca-query-results-placeholder");
    private patentTree = Selector(".ca-tree-view__item").find("span").withText("Patent");
    private trademarkTree = Selector(".ca-tree-view__item").nth(1).find("span").withText("Trademark");
    private disclosureTree = Selector(".ca-tree-view__item").nth(4).find("span").withText("Disclosure");
    private generalIPTree = Selector(".ca-tree-view__item").nth(9).find("span").withText("GeneralIP1");
    private leftMenu = Selector(".ca-splitter__gutter--clickable");

    public automationDuplicateTemplateLnk = Selector('div > ca-menu > ca-flyout-menu > div > ca-flyout:nth-child(3) > div > kendo-popup > div > div > div:nth-child(1) > div');
    public duplicateTemplateCancelBtn = Selector('body > duplicate-dialog > ca-modal > div > div > ca-modal-body > div.duplicate-modal__actions > button:nth-child(1)');

    public async validateSearchQueryArea() {
        await t.expect(this.searchQueryField).ok();
        await CutomLogger.logger.log("info", "Search Query field exists");
        await t.expect(this.queryListTree).ok();
        await CutomLogger.logger.log("info", "Query List Tree exists");
        await t.expect(this.queryResultsArea).ok();
        await CutomLogger.logger.log("info", "Query Results Ares exists");
    }

    public async validateQueryListArea() {
        await t.expect(this.patentTree).ok();
        CutomLogger.logger.log("info", "Patent tree exists");
        await t.expect(this.trademarkTree).ok();
        CutomLogger.logger.log("info", "Trademark Tree exists");
        await t.expect(this.generalIPTree).ok();
        CutomLogger.logger.log("info", "General IP tree exists");
        await t.expect(this.disclosureTree).ok();
        CutomLogger.logger.log("info", "Disclosure tree exists");
    }

    public async validateMoreMenuOptions() {
        await t.click(this.moreMenuBtn)
            .takeScreenshot("moreMenu.png")
            // .expect(Selector(this.collaborateLnk).exists).ok("The 'Collaborate' link doesn't exists")
            .expect(Selector(this.duplicateLnk).exists).ok("The 'Duplicate' link doesn't exists")
            .expect(Selector(this.emailLnk).exists).ok("The 'Email' link doesn't exists")
            .expect(Selector(this.formLetterLnk).exists).ok("The 'Form Letter' link doesn't exists")
            .expect(Selector(this.processRulesLnk).exists).ok("The 'Process Rules' link doesn't exists")
            // .expect(Selector(this.reportsLnk).exists).ok("The 'Reports' link doesn't exists")
            .expect(Selector(this.variablesLnk).exists).ok("The 'Variables Links' link doesn't exists")
            .click(this.moreMenuBtn);
    }

    public async selectCollaborateFromMoreMenuAndValidate() {
        await t
            .click(this.moreMenuBtn)
            .click(this.collaborateLnk)
            .click(this.automationCollaborationProcessLnk)
            .click(this.collaborateSelectRecordsOkPopUpMsg)
            .expect(Selector(this.collaborateRecordsAddedConfirmationMsg).exists).ok();
        CutomLogger.logger.log("info", "The collaboration process ran fine and record has added successfully");

    }

    public async selectDuplicateFromMoreMenuAndValidate(templateLnk: string) {
        await t
            .click(this.moreMenuBtn)
            .click(this.duplicateLnk)
            .click(Selector("div").withText(templateLnk).nth(12).find(".ca-flyout-menu__item"));

        // await t.expect(Selector(this.duplicateTemplateCancelBtn).exists).ok();
        await t.expect(this.duplicateForm).ok();
        // await t.click(this.duplicateTemplateCancelBtn);
        await t.click(this.duplicateTCloseBtn);
        CutomLogger.logger.log("info", "User is able to cancel the duplicate template");

    }    

   /*async selectDuplicateFromMoreMenuAndValidate() {
    await t
        .click(this.moreMenuBtn)
        .click(this.duplicateLnk)
        .click(this.automationDuplicateTemplateLnk);
    await t .expect(Selector(this.duplicateTemplateCancelBtn).exists).ok();
    await t .click(this.duplicateTemplateCancelBtn);      
    CutomLogger.logger.log('info','User is able to cancel the duplicate template');
}
*/

    public async selectEmailFromMoreMenuAndValidate(templateLnk: string) {
        await t
            .click(this.moreMenuBtn)
            .click(this.emailLnk)
            .click(Selector(".ca-flyout-menu.ca-flyout-menu--secondary").find("div").withText(templateLnk).nth(1));

        await t.expect(Selector(this.emailTemplateCancelBtn).exists).ok();
        await t.click(this.emailTemplateCancelBtn);
        CutomLogger.logger.log("info", "User is able to cancel the email template");
    }
    

    public async selectEmailFromMoreMenuAndValidateWithSending(templateLnk: string) {
        await t
            .click(this.moreMenuBtn)
            .click(this.emailLnk)
            .click(Selector(".ca-flyout-menu.ca-flyout-menu--secondary").find("div").withText(templateLnk).nth(1));

        await t.expect(Selector(this.emailTemplateSendBtn).exists).ok();
        await t.click(this.emailTemplateSendBtn);
        CutomLogger.logger.log("info", "User is able to send the email template");
    }

    public async selectFormLetterFromMoreMenuAndValidate() {
        // await this.RemoveFilesByRegexMask(/samplepatentmasterformletter_*/);
        await t
            .click(this.moreMenuBtn)
            .click(this.formLetterLnk)
            .click(this.automationFormLetterTemplateLnk);
        CutomLogger.logger.log("info", "Form letter has opened");
    }

    public async selectProcessRulesFromMoreMenuAndValidate() {
        await t
            .expect(this.moreMenuBtn.exists).ok()
            .click(this.moreMenuBtn)
            .click(this.processRulesLnk);
        await t.expect(Selector(this.processAddedConfirmationMsg).exists).ok();
        CutomLogger.logger.log("info", "Submitted Selected records for rules processing");
    }

    public async selectReportsFromMoreMenuAndValidate(report: string) {
        await t
            .expect(this.moreMenuBtn.exists).ok()
            .click(this.moreMenuBtn)
            .click(this.reportsLnk)
            .click(this.automationReportsLnk);
        const getLocation = ClientFunction(() => document.location.href);
        await t.expect(getLocation()).contains(report);
        CutomLogger.logger.log("info", "The report has created successfully");
        await this.goBack();
    }

    public async selectVariablesLinkFromMoreMenuAndValidate(variablesLinkUrl: string) {
        await t
            .expect(this.moreMenuBtn.exists).ok()
            .click(this.moreMenuBtn)
            .click(this.variablesLnk)
            .click(Selector(".ca-flyout-menu.ca-flyout-menu--secondary").find(".ca-flyout-menu__item"));
        const getLocation = ClientFunction(() => document.location.href);
        await t.expect(getLocation()).contains(variablesLinkUrl);
        CutomLogger.logger.log("info", "The variables link functionality works fine and requested URL has opened successfully");
    }

    public async selectMoreMenu() {
        await t.expect(this.moreMenuBtn.exists).ok()
            .click(this.moreMenuBtn);
        CutomLogger.logger.log("info", "User has clicked on More button");
    }

    public async selectItemFromMoreMenu(itemName: string) {
        await t.click(Selector(".ca-flyout-menu__label").find("span").withText(itemName));
        CutomLogger.logger.log("info", "User has clicked on " + itemName + " in More menu");
    }

    public async isNotExistsItemInMoreMenu(itemName: string) {
        await t.expect(Selector(".ca-flyout-menu__label").find("span").withText(itemName).exists).notOk();
        CutomLogger.logger.log("info", "The " + itemName + " not exists in More menu");
    }

    public async isExistsItemInMoreMenu(itemName: string) {
        await t.expect(Selector(".ca-flyout-menu__label").find("span").withText(itemName).exists).ok(itemName + " does not exist in the More menu!");
        CutomLogger.logger.log("info", "The " + itemName + " exists in More menu");
    }

    public async isEnabledItemInMoreMenu(itemName: string) {
        await t.expect(Selector(".ca-flyout-menu").find("div").withText(itemName).nth(0).find("div").nth(0).classNames).notContains("ca-flyout-menu__item--disabled");
        CutomLogger.logger.log("info", "The " + itemName + " enabled in More menu");
    }

    public async isDisabledItemInMoreMenu(itemName: string) {
        await t.expect(Selector(".ca-flyout-menu").find("div").withText(itemName).nth(0).find("div").nth(0).classNames).contains("ca-flyout-menu__item--disabled");
        CutomLogger.logger.log("info", "The " + itemName + " disabled in More menu");
    }

    public async isNumberOfVariableLinkItemsEquals(count: number) {
        await t.expect(Selector(".ca-flyout-menu.ca-flyout-menu--secondary").find(".ca-flyout-menu__item").count).eql(count);
        CutomLogger.logger.log("info", "The number of Variable Link items equals " + count);
    }

    public async isTextContentVariableLinkItemEquals(textContent: string) {
        await t.expect(Selector(".ca-flyout-menu.ca-flyout-menu--secondary").find(".ca-flyout-menu__item").textContent).eql(textContent);
        CutomLogger.logger.log("info", "The text content of Variable Link item equals " + textContent);
    }

    public async isValidVariableLinkItemUrl(url: string) {
        await t.click(Selector(".ca-flyout-menu.ca-flyout-menu--secondary").find(".ca-flyout-menu__item"));
        const getLocation = ClientFunction(() => document.location.href);
        await t.expect(getLocation()).contains(url);
        CutomLogger.logger.log("info", "The variables link functionality works fine and requested URL has opened successfully");
        await t.navigateTo(DocketingPortalApiUrls.LoginUrl);
    }

    public async isDisabledButton(buttonName: string) {
        await t.expect(Selector("button").withText(buttonName).hasAttribute("disabled")).eql(true);
        CutomLogger.logger.log("info", "Button '" + buttonName + "' disabled on page");
    }

    public async isEnabledButton(buttonName: string) {
        await t.expect(Selector("button").withText(buttonName).hasAttribute("disabled")).eql(false);
        CutomLogger.logger.log("info", "Button '" + buttonName + "' enabled on page");
    }

    public async openQueryRecordInBrowser() {
        await t.click(this.openInBrowserBtn);
        await t.expect(Selector("h4").withText("Current Record").visible).eql(true);
        await this.goBack();
        CutomLogger.logger.log("info", "The PA All cases query page has opened in a new browser");
    }

    public async isMessageDisplayedAfterProcessRulesClick() {
        await t.expect(Selector('[class^="ca-notification-message__container ca-notification-message--success"]').exists).ok();
        CutomLogger.logger.log("info", "The message displayed after Process Rules click");
    }

    public async validateExtensionOfFilesInDocumentNameColumn(extension: string) {
        await t.wait(2000);
        let countOfRecords = +(await this.getTotalCount());
        let count = countOfRecords < 25 ? countOfRecords : 25;
        let i = 1;

        for (i; i <= count; i++) {
            await t.expect(Selector(".k-grid-content > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(1) > linkable-value").textContent).contains("." + extension);
        }

        CutomLogger.logger.log("info", "All records are linkable values and contains " + extension + " extension");
    }

    public async clickOnHtmlFileOfFirstRecordAndValidateDownloading() {
        let htmlFileOfFirstRecord = await Selector(".k-grid-content > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > linkable-value");
        let osHomedir = require("os-homedir");
        let dowloadLocation = osHomedir() + "\\Downloads\\";
        let filePath = dowloadLocation + htmlFileOfFirstRecord.innerText;
        let fs = require("fs");
        if (await fs.existsSync(filePath)) {
            CutomLogger.logger.log("info", filePath + " => File exists and will be removed");
            await fs.unlinkSync(filePath);
        }

        await t.click(htmlFileOfFirstRecord);
        CutomLogger.logger.log("info", "Confirmation message appeared: The export is currently processing.");
        await fs.access(filePath, fs.constants.F_OK, () => {
            CutomLogger.logger.log("info", "File successfully downloaded");
        });
        CutomLogger.logger.log("info", "Successfully validated that exported html document is present in downloaded folder");
    }

    public async isNotExistsFileInGrid(fileName: string) {
        await t.expect(Selector("#custom-child-record-grid").nth(1).find("a").withText(fileName).exists).notOk();
        CutomLogger.logger.log("info", "File is not exists in grid");
    }

    public async sortRecordsByColumn(columnName: string) {
        await t.click(Selector("span").withText(columnName));
        CutomLogger.logger.log("info", "User sorted records by'" + columnName + "' column");
    }

    public async isDocumentNameColumnContainsExtensionOfFilesOrNothing(extension: string) {
        let countOfRecords = +(await this.getTotalCount());
        let count = countOfRecords < 25 ? countOfRecords : 25;
        let i = 1;

        for (i; i <= count; i++) {
            if (await Selector(".k-grid-content > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(1) > linkable-value > a").exists) {
                await t.expect(Selector(".k-grid-content > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(1) > linkable-value > a").textContent).contains("." + extension);
            }
        }

        CutomLogger.logger.log("info", "All records are linkable values and contains " + extension + " extension");
    }

    public async clickOnFileOfFirstRecordAndValidateDownloading() {
        let pdfFileOfFirstRecord = await Selector(".k-grid-content > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > linkable-value");
        let osHomedir = require("os-homedir");
        let dowloadLocation = osHomedir() + "\\Downloads\\";
        let filePath = dowloadLocation + pdfFileOfFirstRecord.innerText;
        let fs = require("fs");
        if (await fs.existsSync(filePath)) {
            CutomLogger.logger.log("info", filePath + " => File exists and will be removed");
            await fs.unlinkSync(filePath);
        }

        await t.click(pdfFileOfFirstRecord);
        CutomLogger.logger.log("info", "Confirmation message appeared: The export is currently processing.");
        await fs.access(filePath, fs.constants.F_OK, () => {
            CutomLogger.logger.log("info", "File successfully downloaded");
        });
        CutomLogger.logger.log("info", "Successfully validated that exported html document is present in downloaded folder");
    }

    public async OpenLeftQueryList() {
        await t.click(this.leftMenu);
        CutomLogger.logger.log("info", "Open query list");
    }
}

