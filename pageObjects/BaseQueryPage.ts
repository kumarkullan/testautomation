import osHomedir = require("os-homedir");
import { ClientFunction, Selector, t } from "testcafe";
import CutomLogger from "../log";
import BasePage from "./BasePage";

export default class BaseQueryPage extends BasePage {
    protected openInBrowserBtn = Selector("button").withText("Open in browser");
    protected moreMenuBtn = Selector("button").withText("More");

    private exportMenu = Selector(".ca-flyout-menu");
    private excelExportBtn = Selector("query-results-menu > div > query-results-export-menu > div > ca-flyout > div > kendo-popup > div > div > div:nth-child(1) > div > span"); // Selector("ca-flyout > div > kendo-popup > div > div > div:nth-child(1) > div > span");
    private textExportBtn = Selector("ca-flyout > div > kendo-popup > div > div > div:nth-child(3) > div > span");
    private htmlExportBtn = Selector("ca-flyout > div > kendo-popup > div > div > div:nth-child(2) > div > span");
    private xmlExportBtn = Selector("ca-flyout > div > kendo-popup > div > div > div:nth-child(4) > div > span");
    private saveBtn = Selector(".ca-button--tertiary").nth(1);
    private saveAndValidateBtn = Selector(".ca-button--tertiary").nth(0);
    private okPopupBtn = Selector(".ca-modal-information__button.ca-button--primary");
    private saveConfirmationMessage = Selector(".ca-notification-message__message").find("span");
    private searchTextBox = Selector(".ca-textbox__input ng-pristine ng-valid ng-touched").nth(1);
    private searchBtn = Selector(".ca-search__search-button");
    private exportConfirmation = Selector("body > ca-notification-message > div > div > div > span");
    private exportBtn = Selector("button").withText("Export");
    private QueryResultsLable = Selector("span").withText("Query Results");
    private TotalRecordCountLable = Selector("h4").withText("Total Record Count");
    private buildComplexBtn = Selector("span").withText("Build complex queries");
    private hideComplexBth = Selector("span").withText("Hide complex queries");
    private showResultsBtn = Selector(".ca-button--primary.ca-query-criteria-builder__results-button");
    private operatorField = Selector(".k-select").nth(1).find(".k-i-arrow-s.k-icon");
    private valueField = Selector(".ca-textbox.ng-untouched.ng-pristine.ng-valid").find("input").nth(1);
    private queryResetBtn = Selector(".dp-button--tertiary");
    private searchFiledInput = Selector(".k-searchbar").find(".k-input");
    private totalCount = Selector("h4").withText("Total Record Count");
    private paginationPanel = Selector("kendo-pager");
    private checkboxForSelectAllRecords = Selector(".k-grid-header-locked > table:nth-child(1) > thead:nth-child(2) > tr:nth-child(1) > th:nth-child(1)");
    private checkboxForSelectFirstRecord = Selector(".k-grid-content-locked > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)");

    private ScrollToElement = ClientFunction((selector: Selector, offset: { x: number, y: number }) => {
        return new Promise((resolve) => {
            const element: any = selector();
            if (element && element.scrollIntoView) {
                element.scrollIntoView();
            }
            if (window && window.scrollBy && offset) {
                window.scrollBy(offset.x, offset.y);
            }
            resolve();
        });
    });

 //   public async selectQueryFromListByName(name: string) {
 //       let searchItem = Selector("input").withText(name).find(".ca-textbox__input ng-pristine ng-valid ng-touched");
 //       await t
 //           .typeText(this.searchTextBox, name, { replace: true })
 //           .click(this.searchBtn)
 //           .click(searchItem);
 //       CutomLogger.logger.log("info", "User has selected the '" + name + "' Query");
 //   }

    public async selectQueryFromListByName_PA(name: string) { 
     let searchTextBox = await Selector("ca-search >ca-textbox > input[placeholder='Search Queries']");
     let searchBtn =  await Selector("ca-search > button[class='ca-search__search-button'] > i").nth(1);
     let paAllCasesResult = await Selector("body > ngx-layout > div > div > div > query > ca-splitter > div > ca-splitter-child-tab > div > query-list > div > ca-tree-view > div > kendo-treeview > ul > li:nth-child(1) > ul > li:nth-child(1) > div > span > div > span > span");

     await t .click(searchTextBox)
             .typeText(searchTextBox, 'PA All Cases')
             .click(searchBtn)
             .click(paAllCasesResult);
    }

    public async selectQueryFromListByName_TM(name: string) { 
        let searchTextBox = await Selector("ca-search >ca-textbox > input[placeholder='Search Queries']");
        let searchBtn =  await Selector("ca-search > button[class='ca-search__search-button'] > i").nth(1);
        let tmAllCasesResult = await Selector("body > ngx-layout > div > div > div > query > ca-splitter > div > ca-splitter-child-tab > div > query-list > div > ca-tree-view > div > kendo-treeview > ul > li:nth-child(1) > ul > li:nth-child(2) > div > span > div > span > span");
   
        await t .click(searchTextBox)
                .typeText(searchTextBox, 'TM All Cases')
                .click(searchBtn)
                .click(tmAllCasesResult);   
       }

    public async isExistsQueryResultsLable() {
        await t.expect(this.QueryResultsLable.exists).ok();
        CutomLogger.logger.log("info", "Query Results lable exists");
    }

    public async isExistsTotalRecordCountLable() {
        await t.expect(this.TotalRecordCountLable.exists).ok();
        CutomLogger.logger.log("info", "Total Record Count lable exists");
    }

    public async isExistsQueryResultsName(queryName: string) {
        await t.expect(Selector("span").withText(queryName).exists).ok();
        CutomLogger.logger.log("info", "Query Results Name '" + queryName + "' exists");
    }

    public async getTotalCount() {
        let total = await this.totalCount.innerText;
        let count = total.slice(total.indexOf(":") + 2);
        CutomLogger.logger.log("info", "Total Record Count:" + count);
        return count;
    }

    public async openNavigateMenu() {
        await t.click(Selector(".ca-splitter__gutter--clickable"));
        CutomLogger.logger.log("info", "Navigate menu was opened");
    }

    public async isCollapsedNavigateMenu() {
        await t.expect(Selector(".fa.fa-chevron-right").exists).ok();
        CutomLogger.logger.log("info", "Navigate menu is collapsed");
    }

    public async clickSaveBtn() {
        await t.click(this.saveBtn)
            .expect(Selector(this.saveConfirmationMessage).exists).ok();
        const saveconfirmationMsgValue = await Selector(this.saveConfirmationMessage).textContent;
        await t.expect(this.saveConfirmationMessage.innerText).contains("Save was successful.");
        CutomLogger.logger.log("info", "The confirmation message has displayed after user clicked on save button: " + saveconfirmationMsgValue);
    }

    public async clickSaveAndValidateBtn() {
        await t.click(this.saveAndValidateBtn)
            .setTestSpeed(1)
            .expect(Selector(this.saveConfirmationMessage).exists).ok();
        const saveAndValidateconfirmationMsgValue = await Selector(this.saveConfirmationMessage).textContent;
        await t.expect(this.saveConfirmationMessage.innerText).contains("Save was successful.");
        CutomLogger.logger.log("info", "The confirmation message has displayed after user clicked on save and validate button: " + saveAndValidateconfirmationMsgValue);
        await t.click(this.okPopupBtn);
    }

    public async openFirstRecord() {
        let firstRecord = await Selector(".k-grid-content-locked > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > navigation-result-value").visible;
        if (firstRecord) {
            await t.click(Selector(".k-grid-content-locked > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > navigation-result-value"));
        } else {
            await t.click(Selector(".k-grid-content-locked > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2)"));
        }

        CutomLogger.logger.log("info", "User opened first record");
    }

    public async selectSeveralRecordsFromQuery(countRecord: number) {
        let i = 1;
        for (i; i < countRecord + 1; i++) {
            let checkBoxClasses = await Selector(".k-grid-content-locked > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + i + ")").classNames;
            if (!checkBoxClasses.some((x) => x === "row-selected")) {
                await this.ScrollToElement(Selector(".k-grid-content-locked > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(1)"), { x: 20, y: -20 });
                await t.click(Selector(".k-grid-content-locked > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(1)"));
            }
        }
        CutomLogger.logger.log("info", countRecord + " records was selected");
    }

    public async selectAllRecordsFromQuery() {
        await t.click(Selector(".k-grid-header-locked > table:nth-child(1) > thead:nth-child(2) > tr:nth-child(1) > th:nth-child(1)"));
        CutomLogger.logger.log("info", "All records was selected");
    }

    public async isExistsCheckboxForSelectOneRecord() {
        await t.expect(this.checkboxForSelectFirstRecord.exists).ok();
        CutomLogger.logger.log("info", "Checkbox for select one record exists");
    }

    public async isExistsCheckboxForSelectAllRecords() {
        await t.expect(this.checkboxForSelectAllRecords.exists).ok();
        CutomLogger.logger.log("info", "Checkbox for select all records exists");
    }

    public async isExistsBuildComplexQueries() {
        await t.expect(this.buildComplexBtn.exists).ok();
        CutomLogger.logger.log("info", "Build complex queries exists");
    }

    public async isExistsHideComplexQueries() {
        await t.expect(this.hideComplexBth.exists).ok();
        CutomLogger.logger.log("info", "Hide complex queries exists");
    }

    public async clickOnBuildComplexQueries() {
        await t.click(this.buildComplexBtn);
        CutomLogger.logger.log("info", "Build complex queries was opened");
    }

    public async clickOnHideComplexQueries() {
        await t.click(this.hideComplexBth);
        CutomLogger.logger.log("info", "Hide complex queries was closed");
    }

    public async clickOnShowResult() {
        await t.click(this.showResultsBtn);
        CutomLogger.logger.log("info", "User has clicked on Show result to run the query using criteria builder");
    }

    public async fillBuildComplexQueries(searchField, operatorName, value) {
        await t.typeText(this.searchFiledInput, searchField, { replace: true })
            .click(Selector("li").withText(searchField).find("span"));

        await t.click(this.operatorField)
            .click(Selector("span").withText(operatorName));

        await t.typeText(this.valueField, value, { replace: true });
        CutomLogger.logger.log("info", "User has filled fields to run the query using criteria builder");
    }

    public async fillBuildComplexQueriesAndClickShowResults(searchField, operatorName, value) {
        await this.clickOnBuildComplexQueries();
        await this.fillBuildComplexQueries(searchField, operatorName, value);
        await this.clickOnShowResult();
        CutomLogger.logger.log("info", "User has filled fields to run the query using criteria builder");
    }

    public async resetQueryFilters() {
        await t.click(this.buildComplexBtn)
            .click(this.queryResetBtn)
            .click(this.showResultsBtn);
        await CutomLogger.logger.log("info", "The filters have been reset");
    }

    public async validateExcelExportFunctionality(filename: string) {
        let dowloadLocation = osHomedir() + "\\Downloads\\";
        let filePath = dowloadLocation + filename;
        let fs = require("fs");
        if (await fs.existsSync(filePath)) {
            CutomLogger.logger.log("info", filePath + " => File exists and will be removed");
            await fs.unlinkSync(filePath);
        }

        await t.click(this.excelExportBtn)
            .expect(Selector(this.exportConfirmation).exists).ok();
        CutomLogger.logger.log("info", "Confirmation message appeared: The export is currently processing.");
        await t.takeScreenshot("exportExcell.png");

        await fs.access(filePath, fs.constants.F_OK, () => {
            CutomLogger.logger.log("info", "File successfully downloaded");
            // console.info(`${filePath} ${err ? "does not exist" : "exists"}`);
        });
        CutomLogger.logger.log("info", "Successfully validated that exported excel document is present in downloaded folder");
    }

    public async validateTxtExportFunctionality(filename: string) {

        let dowloadLocation = osHomedir() + "\\Downloads\\";
        let filePath = dowloadLocation + filename;
        let fs = require("fs");
        if (await fs.existsSync(filePath)) {
            CutomLogger.logger.log("info", filePath + " => File exists and will be removed");
            await fs.unlinkSync(filePath);
        }
        await t
            .expect(Selector(this.textExportBtn).exists).ok()
            .wait(2000)
            .click(this.textExportBtn)
            .expect(Selector(this.exportConfirmation).exists).ok();
        CutomLogger.logger.log("info", "Confirmation message appeared: The export is currently processing.");
        await t.takeScreenshot("exportTXT.png");
        await fs.access(filePath, fs.constants.F_OK, () => {
            CutomLogger.logger.log("info", "File successfully downloaded");
        });
        CutomLogger.logger.log("info", "Successfully validated that exported txt document is present in downloaded folder");
    }

    public async openExportMenu() {
        await t
            .expect(Selector(this.exportConfirmation).exists).notOk("Confirmation message still exist")
            .expect(this.exportBtn.exists).ok("Export link not available")
            .wait(2000)
            .click(this.exportBtn)
            .expect(this.exportMenu.exists).ok("Export Menu not appeared");
        await CutomLogger.logger.log("info", "Export Menu opened");
    }

    public async validateExportMenuBarOptions() {
        await t.expect(Selector(this.excelExportBtn).exists).ok();
        const excelExportValue = await Selector(this.excelExportBtn).textContent;
        await t.expect(this.excelExportBtn.innerText).contains("Excel Export");
        CutomLogger.logger.log("info", "The export link displayed as: " + excelExportValue);

        await t.expect(Selector(this.htmlExportBtn).exists).ok();
        const htmlExportValue = await Selector(this.htmlExportBtn).textContent;
        await t.expect(this.htmlExportBtn.innerText).contains("HTML");
        CutomLogger.logger.log("info", "The export link displayed as: " + htmlExportValue);

        await t.expect(Selector(this.textExportBtn).exists).ok();
        const textExportValue = await Selector(this.textExportBtn).textContent;
        await t.expect(this.textExportBtn.innerText).contains("Text");
        CutomLogger.logger.log("info", "The export link displayed as: " + textExportValue);

        await t.expect(Selector(this.xmlExportBtn).exists).ok();
        const xmlExportValue = await Selector(this.xmlExportBtn).textContent;
        await t.expect(this.xmlExportBtn.innerText).contains("XML");
        CutomLogger.logger.log("info", "The export link displayed as: " + xmlExportValue);

        CutomLogger.logger.log("info", "The Export menu contains Excel,Html,Text and Xml documents link");
    }

    public async RemoveFilesByRegexMask(filemask) {
        let dowloadLocation = osHomedir() + "\\Downloads\\";
        let fs = require("fs");
        try {
            await fs.readdir(dowloadLocation, async (files) => {
                for (let i = 0, len = files.length; i < len; i++) {
                    let match = files[i].match(filemask);
                    if (match !== null) {
                        CutomLogger.logger.log("info", "The file " + match[0] + " will be deleted");
                        await fs.unlinkSync(dowloadLocation + match[0]);
                    }
                }
            });
        } catch { CutomLogger.logger.log("info", "No file to delete"); }
    }

    public async isNotExistsOpenInBrowserBtn() {
        await t.expect(this.openInBrowserBtn.exists).notOk();
        CutomLogger.logger.log("info", "Open in browser button not exists");
    }

    public async isNotExistsMoreMenuBtn() {
        await t.expect(this.moreMenuBtn.exists).notOk();
        CutomLogger.logger.log("info", "More menu button not exists");
    }

    public async isExistsPaginationPanel() {
        await t.expect(this.paginationPanel.exists).ok();
        CutomLogger.logger.log("info", "Pagination panel exists");
    }

    public async validateFirstColoumnNameOfResultSet(columnName: string) {
        await t.expect(Selector(".ca-query-results-grid__header-text").nth(0).innerText).eql(columnName);
        CutomLogger.logger.log("info", "The first column is '" + columnName + "' column");
    }

    public async isNoHyperlinkInFirstColoumnOfResultSet() {
        await t.expect(Selector("navigation-result-value").nth(1).find("a").count).eql(0);
        CutomLogger.logger.log("info", "There is no hyperlink in the first column of the party query result set");
    }

    public async isImageInFirstColoumnOfResultSet() {
        await t.expect(Selector("navigation-result-value").nth(1).find("img").exists).ok();
        CutomLogger.logger.log("info", "The first column contains images");
    }

    public async isNoImageInFirstColoumnOfResultSet() {
        await t.expect(Selector("navigation-result-value").nth(1).find("img").exists).notOk();
        CutomLogger.logger.log("info", "The first column doesn't contain images");
    }
}
