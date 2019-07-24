import { ClientFunction, Selector, t } from "testcafe";
import CutomLogger from "../log";
import BasePage from "./BasePage";
import { SqlClient } from "msnodesqlv8";
let DEFTestData_reg = require("../testData/DEFTestData_Reg.json");

export default class DataEntryFormPage extends BasePage {

    public defLink = Selector(".main-section__link").nth(1);
    public selectDef = Selector(".main-section__link").nth(1);
    public docketNumber = Selector("#userName").nth(0);
    public countryRegion = Selector("div.filing-section__row:nth-child(2) > div:nth-child(1) > ca-large-list-lookup:nth-child(2) > kendo-combobox:nth-child(1) > span:nth-child(1) > kendo-searchbar:nth-child(1) > input:nth-child(1)");
    public caseType = Selector("div.filing-section__row:nth-child(3) > div:nth-child(1) > ca-large-list-lookup:nth-child(2) > kendo-combobox:nth-child(1) > span:nth-child(1) > kendo-searchbar:nth-child(1) > input:nth-child(1)");
    public filingType = Selector("div.filing-section__row:nth-child(4) > div:nth-child(1) > ca-large-list-lookup:nth-child(2) > kendo-combobox:nth-child(1) > span:nth-child(1) > kendo-searchbar:nth-child(1) > input:nth-child(1)");
    public clearValueBtn = Selector(".k-icon.k-clear-value.k-i-close");
    public saveBtn = Selector("button").withText("Save").nth(1); // Selector(".ca-button--tertiary").nth(1);
    public saveAndValidateBtn = Selector("button").withText("Save & Validate").nth(0); // Selector(".ca-button--tertiary").nth(0);
    public okPopupBtn = Selector(".ca-modal-information__button.ca-button--primary");
    public saveConfirmationMessage = Selector(".ca-notification-message__message").find("span");
    public continueBtn = Selector(".ca-modal-confirmation__button.ca-button--primary");
    public selectPAALLCases = Selector("body > ngx-layout > div > div > div > query > ca-splitter > div > ca-splitter-child-tab > div > query-list > div > ca-tree-view > div > kendo-treeview > ul > li:nth-child(1) > ul > li:nth-child(43) > div > span > div > span");
    public clickPatent = Selector(".k-icon.ng-tns-c0-0.k-i-expand").nth(0);
    public searchTextBox = Selector(".ca-textbox__input");
    public searchBtn = Selector(".ca-search__search-button");
    public firstRecordInGridResults = Selector("kendo-grid-list > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)");
    public openInBrowserBtn = Selector("body > ngx-layout > div > div > div > query > ca-splitter > div > ca-splitter-master-tab > div > query-results > div > div.ca-query-results__grid > query-results-menu > div > query-results-open-in-browser > button");
    public exportBtn = Selector(".dp-button--primary").nth(1);
    public excelExportBtn = Selector("ca-flyout > div > kendo-popup > div > div > div:nth-child(1) > div > span");

    public partyQueryLnk = Selector(".ca-flyout-menu__item").find("span").withText("Party Query");
    public firstWebLnk = Selector(".ca-flyout-menu__item").find("span").withText("USPTO");

    public resultsPlaceholder = Selector(".ca-query-results-placeholder");
    public dataEntryListDrpDown = Selector(".k-popup ng-trigger ng-trigger-toggle");

    public disclosureNumber = Selector("#userName").nth(0);
    public generallP1KeyText = Selector("#userName").nth(0);

    public addNewBtn = Selector("button").withText("Add New");
    public addAsBtn = Selector("button").withText("Add as");
    public closeBtn = Selector("button").withText("Close");

    public docketNumberValue: string;
    public disclosureNumberValue: string;


    //********************** */Regression testcase elements added by Kumar Kullan on 12/14/2018-START **********************************************************************
    public queryLink = Selector(".nav-menu__link").nth(0);
    private nextPageBtn = Selector("data-entry-form > div > def-child-records > div > div:nth-child(3) > button");
    private paymentHistroyBtn = Selector("ngx-layout > div > div > div > data-entry-form > div > def-child-records > ul > li").withText('Payment History');
    private previuousPageBtn = Selector("data-entry-form > div > def-child-records > div > div:nth-child(1) > button > i");
    private previuousPageBtn_1 = Selector(".fa-chevron-left").nth(0);
    private paymentScheduleBtn = Selector("ngx-layout > div > div > div > data-entry-form > div > def-child-records > ul > li").withText('Payment Schedule');
    private paymentHistoryGrid = Selector(".k-grid-header-wrap");
    private paymentHistoryGrid_totalRecords = Selector("#child-record-grid > kendo-grid-toolbar > div");
    private paymentHistoryGrid_updateUser = Selector("#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr > td:nth-child(17) > div");
    private editFirstRecordImg = Selector(".k-grid-content-locked > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2)");
    private selectRecord_paymentSchedule = Selector("html > body> ngx-layout > div > div > div > data-entry-form > div > div > div > div:nth-child(1) > def-child-record > div > div:nth-child(2) > div > ca-grid>kendo-grid > div > kendo-grid-list> div > div:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > ca-checkbox > label");
    private paidDate_paymentSchedule = Selector("ngx-layout>div>div>div>data-entry-form>div>div>div>div:nth-child(1)>def-child-record>div>div:nth-child(2)>div>ca-grid>kendo-grid>div>kendo-grid-list>div>div:nth-child(1)>table>tbody>tr:nth-child(1)>td:nth-child(6)");
    private dropDate_paymentSchedule = Selector("kendo-grid#child-record-grid > div > kendo-grid-list > div > div > table > tbody > tr > td:nth-of-type(5)");
    private dueDate_paymentSchedule = Selector('#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(2) > ca-editable-grid-cell > div > ca-datepicker > ca-dateinput > ca-textbox > input');
    private projectedDue_paymentSchedule_delete = Selector('#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(3) > div');
    private projectedDue_paymentSchedule = Selector('#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(3) > ca-editable-grid-cell > div >ca-numerictext >kendo-numerictextbox >span> input');
    private dueDate_paymentSchedule_delete = Selector("kendo-grid#child-record-grid > div > kendo-grid-list > div > div > table > tbody > tr > td:nth-of-type(2) > span").nth(0);
    private dueDate_paymentHistory = Selector('#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(2) > ca-editable-grid-cell > div > ca-datepicker > ca-dateinput > ca-textbox > input');
    private dueDate_paymentHistory_delete = Selector("kendo-grid#child-record-grid > div > kendo-grid-list > div > div > table > tbody > tr > td:nth-of-type(2) > span").nth(0);
    private dueDate_paymentHistory_get = Selector("#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr > td:nth-child(2) > span");
    private dueDate_paymentSchedule_get = Selector("#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(2) > span");
    private paymentSchedule_TaxYear = Selector("#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(4) > div");
    private paymentSchedule_TaxYear_enter = Selector("#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(4) > ca-editable-grid-cell > div > ca-numerictext >kendo-numerictextbox > span > input");
    private filingNumberTxt = Selector("ca-textbox[name='PAM$FILINGNUMBER'] > input");
    private filingNumberTxt_tm = Selector("ca-textbox[name='TMM$FILINGNUMBER'] > input");
    private docketNumberTxt_pa = Selector("ca-textbox[name='PAM$DOCKETNUMBER'] > input");
    private docketNumberTxt_tm = Selector("ca-textbox[name='TMM$DOCKETNUMBER'] > input");
    private patentNumberTxt = Selector(".filing-section__row:nth-child(14) #userName > #userName");
    private applicationNumberTxt = Selector("ca-multilinetext[name='PAM$APPLICATIONNUMBER'] > textarea");

    private parentFilingDate = Selector("ca-datepicker[name='PAM$PARENTFILINGDATE'] > ca-dateinput >ca-textbox > input");
    private applicationDate = Selector("ca-datepicker[name='PAM$APPLICATIONDATE'] > ca-dateinput >ca-textbox > input");
    private grantDate = Selector("ca-datepicker[name='PAM$GRANTDATE'] > ca-dateinput >ca-textbox > input");

    private currentApplicationNumberTxt = Selector("ca-textbox[name='TMM$CURRENTAPPLICATIONNUMBER'] > input");
    private originalApplicationNumberTxt = Selector("ca-textbox[name='TMM$ORIGINALAPPLICATIONNUMBER'] > input");
    private currentApplicationDateTxt = Selector("ca-datepicker[name='TMM$CURRENTAPPLICATIONDATE'] > ca-dateinput >ca-textbox >input");
    private originalApplicationDateTxt = Selector("ca-datepicker[name='TMM$ORIGINALAPPLICATIONDATE'] > ca-dateinput >ca-textbox >input");

    private currentRegistrationNumberTxt = Selector("ca-textbox[name='TMM$CURRENTREGISTRATIONNUMBER'] > input");
    private originalRegistrationNumberTxt = Selector("ca-textbox[name='TMM$ORIGINALREGISTRATIONNUMBER'] > input");

    private currentRegistrationDateTxt = Selector("ca-datepicker[name='TMM$CURRENTREGISTRATIONDATE'] > ca-dateinput >ca-textbox >input");
    private originalRegistrationDateTxt = Selector("ca-datepicker[name='TMM$ORIGINALREGISTRATIONDATE'] > ca-dateinput >ca-textbox >input");

    private paymentHistry_GridData = Selector("kendo-grid#child-record-grid > div > kendo-grid-list > div > div > table > tbody > tr > td");
    private paymentSchedule_GridData = Selector("kendo-grid#child-record-grid > div > kendo-grid-list > div > div > table > tbody > tr > td");
    private paymentHistory_TaxYear = Selector("#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr > td:nth-child(4) > div");
    private paymentHistory_TaxYear_row1 = Selector("kendo-grid#child-record-grid > div > kendo-grid-list > div > div > table > tbody > tr:nth-child(2) > td:nth-of-type(5) > div");
    private paymentHistory_selectFirstRecChk = Selector('#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr:nth-child(1) > td.ca-grid__checkbox-cell > div > ca-checkbox > input');
    private paymentHistory_deleteRecordBtn = Selector("div#defViewContainer > div > def-child-record > div > div > div > div:nth-of-type(2) > span > button > i");
    private paymentHistory_deleteRecord_confirmationBtn = Selector("ca-modal-confirmation > ca-modal > div > div > ca-modal-body > div:nth-of-type(3) > button:nth-of-type(2)");
    private paymentSchedule_totalRecords = Selector("#child-record-grid > kendo-grid-toolbar > div");
    private selectPaymentScheduleRecordchk = Selector("#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr:nth-child(1) > td.ca-grid__checkbox-cell > div > ca-checkbox>input");

    private paymentSchedule_deleteRecordBtn = Selector("#defViewContainer > div.data-entry-form__child-record-section > def-child-record > div > div.child-record__header > div > div.child-record-menu__section--border-l > span > button > i");
    private paymentSchedule_deleteRecord_confirmationBtn = Selector("ca-modal-confirmation > ca-modal > div > div > ca-modal-body > div.ca-modal-confirmation__actions > button.ca-modal-confirmation__button.ca-button--primary");
    private paymentSchedule_addPaidNotes = Selector("kendo-grid#child-record-grid > div > kendo-grid-list > div > div > table > tbody > tr > td:nth-of-type(15)");
    private paymentSchedule_feeTypeInGrid = Selector("#child-record-grid > div > div > div > table > thead > tr:nth-child(1) > th:nth-child(18) > a > span:nth-child(1)");
    private paymentSchedule_feeType_taxes = Selector("#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(18) > div");
    private paymentSchedule_feeType_working = Selector("#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr:nth-child(6) > td:nth-child(18) > div");
    private paymentSchedule_taxPaidForLifeChk = Selector("#dataEntryForm > ca-tabs > div > div > ca-tab > div > div.filing-section__form-container > div:nth-child(17) > div:nth-child(3) >ca-checkbox >input");
    private paymentSchedule_taxPaidForLifeUnChk_errorMsg = Selector("ca-modal-error > ca-modal > div > div > ca-modal-body > div.ca-modal-error__message > span.ca-modal-error__message-item");
    private paymentSchedule_taxPaidForLifeUnChk_errorMsg_okBtn = Selector("ca-modal-error > ca-modal > div > div > ca-modal-body > div.ca-modal-error__actions > button");
    private paymentHistory_taxPaidForLife_selectAllBtn = Selector("kendo-grid#child-record-grid > div > div > div > table > thead > tr > th > div > ca-checkbox > input");
    private paymentHistory_taxPaidForLife_deleteBtn = Selector("div#defViewContainer > div > def-child-record > div > div > div > div:nth-of-type(2) > span > button > i");
    private paymentSchedule_unSaved_errorMsg = Selector("ca-modal-confirmation > ca-modal > div > div > ca-modal-body > div.ca-modal-confirmation__message > span");
    private paymentSchedule_unSaved_changes_continueBtn = Selector("ca-modal-confirmation > ca-modal > div > div > ca-modal-body > div.ca-modal-confirmation__actions > button.ca-modal-confirmation__button.ca-button--primary");
    private paymentSchedule_unSaved_changes_cancelBtn = Selector("ca-modal-confirmation > ca-modal > div > div > ca-modal-body > div.ca-modal-confirmation__actions > button.ca-modal-confirmation__button.ca-button--secondary");
    private paymentSchedule_systemField = Selector("kendo-grid#child-record-grid > div > kendo-grid-list > div > div > table > tbody > tr > td:nth-of-type(18) > div").nth(0);
    private paymentSchedule_paymentStatus_value = Selector("#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr > td:nth-child(8) > div");

    //********************** */Regression testcase elements added by Kumar Kullan on 12/14/2018-END**********************************************************************

    public async SelectItemFromDefList(itemName: string) {
        CutomLogger.logger.log("info", "Select '" + itemName + "' from the list");
        await t.click(this.defLink);
        // let defselect1 = await Selector(".ca-flyout-menu__item");
        // let defvalueselect = await defselect1.find("span");
        await t.click(Selector("span").withText(itemName));
    }

    public async getCurrentTime() {
        let today = new Date();
        let timeStamp = today.getHours() + "h_" + today.getMinutes() + "m_" + today.getSeconds() + "s";
        return timeStamp;
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
    public async clickSaveAndValidateBtn_NoOkPopUp() {
        await t.click(this.saveAndValidateBtn);
        await t.expect(Selector(this.saveConfirmationMessage).exists).ok();
        const saveAndValidateconfirmationMsgValue = await Selector(this.saveConfirmationMessage).textContent;
        await t.expect(this.saveConfirmationMessage.innerText).contains("Save was successful.");
        CutomLogger.logger.log("info", "The confirmation message has displayed after user clicked on save and validate button: " + saveAndValidateconfirmationMsgValue);

    }

    public async fillTradeMarkDEFAndClickSaveBtn(dockNumber: string, country: string, caseType: string, filingType: string) {
        CutomLogger.logger.log("info", "Fill in the data on the new TradeMark form");
        let random = Math.floor(Math.random() * 100000000);
        let docketName = dockNumber + random;
        await t.typeText(this.docketNumber, docketName);
        let countryclk = await Selector(".k-i-arrow-s.k-icon").nth(0);
        await t.click(countryclk);
        let querySelect_Country = await Selector("body >ngx-layout >kendo-popup > div >kendo-list > div > ul > li");
        await t.click(querySelect_Country.withText(country));

        let caseTypeClk = await Selector(".k-i-arrow-s.k-icon").nth(1);
        await t.click(caseTypeClk);
        let querySelect_CaseType = await Selector("body >ngx-layout >kendo-popup > div >kendo-list > div > ul > li");
        await t.click(querySelect_CaseType.withText(caseType));

        let filingTypeClk = await Selector(".k-i-arrow-s.k-icon").nth(2);
        await t.click(filingTypeClk);
        let querySelect_FilingType = await Selector("body >ngx-layout >kendo-popup > div >kendo-list > div > ul > li");

        await t.click(querySelect_FilingType.withText(filingType));
        await this.clickSaveBtn();
    }

    public async updateTrademarkDEFAndClickSaveAndValidateBtn(dockNumber: string) {
        CutomLogger.logger.log("info", "Update Docket Number field");
        let random = Math.floor(Math.random() * 100000000);
        let docketName = dockNumber + random;

        await t.click(this.docketNumber).pressKey("ctrl+a delete");
        await t.typeText(this.docketNumber, docketName);
        await this.clickSaveAndValidateBtn();
        return docketName;
    }

    public async fillDisclousureDEFAndClickSaveBtn(disclosure: string) {
        CutomLogger.logger.log("info", "Fill in the data on the new Disclousure form");
        let random = Math.floor(Math.random() * 100000000);
        await t.typeText(this.disclosureNumber, disclosure + random);
        await this.clickSaveBtn();
    }

    public async updateDisclosureDEFAndClickSaveAndValidateBtn(updateDisclosure: string) {
        CutomLogger.logger.log("info", "Update Disclosure Number field");
        let random = Math.floor(Math.random() * 100000000);
        await t.click(this.docketNumber).pressKey("ctrl+a delete");
        let updatedDock_Disclosure = updateDisclosure + random;
        await t.typeText(this.disclosureNumber, updatedDock_Disclosure);
        await this.clickSaveAndValidateBtn_NoOkPopUp();
        return updatedDock_Disclosure;
    }

    public async fillGenerallP1DEFAndClickSaveBtn(keytext: string, keycountry: string) {
        CutomLogger.logger.log("info", "Fill in the data on the new GIP form");
        let random = Math.floor(Math.random() * 100000000);
        await t.typeText(this.generallP1KeyText, keytext + random);

        let countryclk_gen = await Selector(".k-i-arrow-s.k-icon");
        await t.click(countryclk_gen);
        let querySelect_Country_Gen = await Selector("body >ngx-layout >kendo-popup > div >kendo-list > div > ul > li");
        await t.click(querySelect_Country_Gen.withText(keycountry));
    }

    public async updateGenerallP1DEFAndClickSaveAndValidateBtn(updatedkey: string) {
        CutomLogger.logger.log("info", "Update KeyText field");
        let random = Math.floor(Math.random() * 100000000);
        let updatedKeyText = updatedkey + random;
        await t.click(this.generallP1KeyText).pressKey("ctrl+a delete");
        await t.typeText(this.generallP1KeyText, updatedKeyText);
        await this.clickSaveAndValidateBtn_NoOkPopUp();
        return updatedKeyText;
    }

    public async fillPatentDEFAndClickSaveBtn(dockNumber_patent: string, country_patent: string, caseType_patent: string, relationtype_patent: string, filingType_patent: string) {
        CutomLogger.logger.log("info", "Fill in the data on the new Patent form");
        let random = Math.floor(Math.random() * 100000000);
        let dockNumber = dockNumber_patent + random;
        await t.click(this.docketNumber).pressKey("ctrl+a delete");
        await t.typeText(this.docketNumber, dockNumber);
        let countryclk = await Selector(".k-i-arrow-s.k-icon").nth(0);
        await t.click(countryclk);
        let querySelect_Country = await Selector("body >ngx-layout >kendo-popup > div >kendo-list > div > ul > li");
        await t.click(querySelect_Country.withText(country_patent));

        let caseTypeClk = await Selector(".k-i-arrow-s.k-icon").nth(1);
        await t.click(caseTypeClk);
        let querySelect_CaseType = await Selector("body >ngx-layout >kendo-popup > div >kendo-list > div > ul > li");
        await t.click(querySelect_CaseType.withText(caseType_patent));

        let relationTypeClk = await Selector(".k-i-arrow-s.k-icon").nth(2);
        await t.click(relationTypeClk);
        let querySelect_RelationType = await Selector("body >ngx-layout >kendo-popup > div >kendo-list > div > ul > li");
        await t.click(querySelect_RelationType.withText(relationtype_patent));

        let filingTypeClk = await Selector(".k-i-arrow-s.k-icon").nth(3);
        await t.click(filingTypeClk);
        let querySelect_FilingType = await Selector("body >ngx-layout >kendo-popup > div >kendo-list > div > ul > li");
        await t.click(querySelect_FilingType.withText(filingType_patent));
        //  await this.clickSaveBtn();
    }

    public async updatePatentDEFAndClickSaveAndValidateBtn(updateDocketNumber: string) {
        CutomLogger.logger.log("info", "Update Docket Number field");
        let random = Math.floor(Math.random() * 100000000);
        await t.click(this.docketNumber).pressKey("ctrl+a delete");
        let updatedDock_Patent = updateDocketNumber + random;
        await t.typeText(this.docketNumber, updatedDock_Patent);
        await this.clickSaveAndValidateBtn();
        return updatedDock_Patent;
    }

    public async updateTradeMarkDEFAndClickSaveAndValidateBtn(updateDocketNumber: string) {
        CutomLogger.logger.log("info", "Update Docket Number field");
        let random = Math.floor(Math.random() * 100000000);
        await t.click(this.docketNumber).pressKey("ctrl+a delete");
        let updatedDock_Patent = updateDocketNumber + random;
        await t.typeText(this.docketNumber, updatedDock_Patent);
        await this.clickSaveAndValidateBtn();
        return updatedDock_Patent;
    }

    public async navigateToDefPage(templateName: string) {
        let templateSelector = Selector(".ca-flyout-menu").find("div").withText(templateName);
        await t.expect(templateSelector.exists).ok();
        await t.click(templateSelector);
        CutomLogger.logger.log("info", "The Data Entry Form Menu bar are present and user is able to perform click the links");
    }

    public async fillDocketNumberField() {
        let docketNumber = "DocN." + Date.now();
        await t.typeText(this.docketNumber, docketNumber);
        this.docketNumberValue = docketNumber;
        CutomLogger.logger.log("info", "User fill Docket Number field");
    }

    public async fillDisclosureNumberField() {
        let disclosureNumber = "DisN." + Date.now();
        await t.typeText(this.disclosureNumber, disclosureNumber);
        this.disclosureNumberValue = disclosureNumber;
        CutomLogger.logger.log("info", "User fill Disclosure Number field");
    }

    public async fillClientDivisionField(clientDivisionName: string) {
        let clientDivisionSelector = Selector(".k-searchbar").find(".k-input");
        await t.typeText(clientDivisionSelector, clientDivisionName);
        await t.click(Selector("li").withText(clientDivisionName).find(".ca-large-list-lookup__item"));
        CutomLogger.logger.log("info", "User fill Client Division field");
    }

    public async fillKeyTextField() {
        let generallPKeyText = Selector("#userName").nth(0);
        await t.typeText(generallPKeyText, "KT" + Date.now());
        CutomLogger.logger.log("info", "User fill Key Text field");
    }

    public async clickItemFromMenuBar(itemName: string) {
        let isItemExist = await Selector("button").withText(itemName).visible;
        if (!isItemExist) {
            await t.click(Selector(".fa.fa-chevron-right").nth(1));
        }
        await t.click(Selector("button").withText(itemName));
        CutomLogger.logger.log("info", "User open " + itemName + " child tab");
    }

    public async selectSeveralRecords(count: number) {
        let i = 1;
        const scrollToElement = ClientFunction((selector: Selector, offset: { x: number, y: number }) => {
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
        for (i; i < count + 1; i++) {
            let checkBoxClasses = await Selector(".k-grid-content-locked > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + i + ")").classNames;
            if (!checkBoxClasses.some((x) => x === "row-selected")) {
                await scrollToElement(Selector(".k-grid-content-locked > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(1)"), { x: 20, y: -20 });
                await t.click(Selector(".k-grid-content-locked > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(1)"));
            }
        }
    }

    public async addNewRelatedRecords(count: number, relationshipType: string, resource: string, ipType?: string) {
        await t.expect(this.addNewBtn).ok().click(this.addNewBtn);
        CutomLogger.logger.log("info", "User clicked the 'Add New' button on Related Record child tab");

        let isQueryVisiable = await Selector(".ca-tree-view__item").find("span").withText(resource).exists;
        if (!isQueryVisiable) {
            await t.click(Selector(".ca-tree-view__item").find("span").withText(ipType));
        }
        const queryName = Selector(".ca-tree-view__item").find("span").withText(resource);
        await t.expect(queryName).ok().click(queryName);
        CutomLogger.logger.log("info", "User choose '" + resource + "'");

        await this.addSeveralRecordsWithRelationshipType(count, relationshipType);

        let isRecordExist = await (Selector("button").withText("OK").exists);
        if (isRecordExist) {
            await t.click(Selector("button").withText("OK"));
            CutomLogger.logger.log("info", "This record(s) already exists with same relationship");
        }
        await t.expect(this.closeBtn).ok().click(this.closeBtn);
        CutomLogger.logger.log("info", "User close Add new relationship modal window");
    }

    public async addFilter(columnName: string, filterCriteria: string) {
        await t.expect(Selector("#" + columnName)).ok().click(Selector("#" + columnName));
        const filterSelector = Selector(".ca-textbox.ng-untouched.ng-pristine.ng-valid").find("input");
        await t.typeText(filterSelector, filterCriteria);
        await t.click(Selector(".apply-filter-button").find("button").withText("Filter"));
        CutomLogger.logger.log("info", "User add filter '" + filterCriteria + "' for '" + columnName + "' column");
    }

    public async deleteFilter() {
        await t.click(Selector("#child-record-grid").nth(1).find(".k-icon.k-i-filter-clear"));
        CutomLogger.logger.log("info", "User delete filter");
    }

    public async dragChildTabGridColumn(columnName: string, dragX: number, dragY: number) {
        await t.drag(Selector(".k-grid-header-wrap").find("th").withText(columnName), dragX, dragY);
        CutomLogger.logger.log("info", "User dragged '" + columnName + "' column");
    }

    public async deleteSeveralRecords(count: number) {
        let i = 1;
        for (i; i < count + 1; i++) {
            let checkBoxClasses = await Selector(".k-grid-content > .k-grid-table-wrap > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + i + ")").classNames;
            if (!checkBoxClasses.some((x) => x === "row-selected")) {
                await t.expect(Selector(".k-grid-content > .k-grid-table-wrap > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(1) > div > ca-checkbox > label").exists).ok();
                await t.click(Selector(".k-grid-content > .k-grid-table-wrap > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + i + ") > td:nth-child(1) > div > ca-checkbox > label"));
            }
        }
        await t.expect(Selector(".dp-button--icon").exists).ok()
            .click(Selector(".dp-button--icon"));
        await t.expect(Selector("button").withText("Yes").exists).ok()
            .click(Selector("button").withText("Yes"));
        CutomLogger.logger.log("info", "User delete " + count + " records");
    }

    public async deleteAllRecords() {
        const selectAllCheckbox = Selector(".k-grid-header > .k-grid-header-wrap > table:nth-child(1) > thead:nth-child(2) > tr:nth-child(1) > th:nth-child(1) > div > ca-checkbox > label");
        await t.expect(selectAllCheckbox).ok().click(selectAllCheckbox);

        await t.expect(Selector(".dp-button--icon").exists).ok()
            .click(Selector(".dp-button--icon"));
        await t.expect(Selector("button").withText("Yes").exists).ok()
            .click(Selector("button").withText("Yes"));
        CutomLogger.logger.log("info", "User delete all records");
    }

    public async clickRecordIdentifierLink(row: number) {
        let linkRecord = Selector("kendo-grid-list > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(" + row + ") > td:nth-child(4)");
        await t.expect(linkRecord.exists).ok().click(linkRecord);
        CutomLogger.logger.log("info", "User click on link records");
    }

    public async updateTextValue(textValue: string) {
        await t.click(this.docketNumber).pressKey("ctrl+a delete");
        let currenttimeinMS = new Date().getTime();
        let updatedValue = textValue + currenttimeinMS;
        await t.typeText(this.docketNumber, updatedValue);
        //  await this.clickSaveBtn();
        await this.clickSaveAndValidateBtn();
    }

    private async addSeveralRecordsWithRelationshipType(count: number, relationshipType: string) {
        await this.selectSeveralRecords(count);
        await t.expect(this.addAsBtn).ok().click(this.addAsBtn);
        const relatedRecordsDropdown = Selector(".related-records-dropdown").find("div");
        await t.expect(relatedRecordsDropdown.withText(relationshipType)).ok()
            .click(relatedRecordsDropdown.withText(relationshipType));
        CutomLogger.logger.log("info", "User add " + count + " records as '" + relationshipType + "' relationship");
    }


    //********************** */Regression testcase methods added by Kumar Kullan on 12/14/2018-START**********************************************************************

    public async SelectItemFromDefList_DEF(itemName: string) {
        CutomLogger.logger.log("info", "Select '" + itemName + "' from the list");
        await t.click(this.defLink);
        let defselect = await Selector('.ca-flyout-menu__item').find('span').withExactText(itemName);
        await t.click(defselect);
    }

    public async verifyPaymentHistoryChildTab() {
        await t
            .expect(this.nextPageBtn.exists).ok()
            .click(this.nextPageBtn)
            .expect(this.paymentHistroyBtn.exists).ok();
        CutomLogger.logger.log("info", "The payment history child tab is present");
        await t
            .click(this.paymentHistroyBtn)
        CutomLogger.logger.log("info", "No rules have ever run against the case record and no tax years have ever paid and the Payment History grid has displayed with column headers and with the message");

        await t
            .expect(this.paymentHistoryGrid.exists).ok()
        CutomLogger.logger.log("info", "The Payment History grid has displayed all columns that were configured for the Data Entry Template record opened in");
        CutomLogger.logger.log("info", "There is no [Add New] button on Payment History child tab");
    }

    public async verifyPaymentScheduleTab() {
        await t
            .click(this.nextPageBtn)
            .expect(this.paymentScheduleBtn.exists).ok()
            .click(this.paymentScheduleBtn)
            .click(this.paidDate_paymentSchedule)
            .click(this.paidDate_paymentSchedule).pressKey("ctrl+a delete")
            .typeText(this.paidDate_paymentSchedule, DEFTestData_reg[0].PaidDate)
            .click(this.saveBtn);
        const taxYear_paymentSchedule_BeforeSaveAndValidate = await Selector(this.paymentSchedule_TaxYear).textContent;
        await t.expect(this.paymentSchedule_TaxYear.exists).ok();
        CutomLogger.logger.log("info", "Paid tax year continue to be displayed in the Payment Schedule section and the value dispalyed as : " + taxYear_paymentSchedule_BeforeSaveAndValidate);

        await t
            .click(this.previuousPageBtn)
            .click(this.paymentHistroyBtn)
        const gridValue_paymentHistory = await Selector(this.paymentHistry_GridData).textContent;
        await t.expect(this.paymentHistry_GridData.innerText).contains('No records available.');
        CutomLogger.logger.log("info", "Payment History continue to be empty and the value displayed in payment history grid is : " + gridValue_paymentHistory);
        CutomLogger.logger.log("info", "Paid tax year must continue to be displayed in the Payment Schedule section. Payment History continue to be empty as no rules have been run for the record with paid tax year");

        await t
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)
            .click(this.nextPageBtn)
            .click(this.paymentScheduleBtn)
        const taxYear_AftetSaveAndValidate = await Selector(this.paymentSchedule_TaxYear).textContent;
        CutomLogger.logger.log("info", "paid tax year value after save and validate : " + taxYear_AftetSaveAndValidate);
        await t.expect(taxYear_paymentSchedule_BeforeSaveAndValidate).notEql(taxYear_AftetSaveAndValidate)
        CutomLogger.logger.log("info", "Paid tax year doest not displayed in the Payment Schedule becuase the tax year values are not same before and after save validate")

        await t
            .click(this.previuousPageBtn)
            .click(this.paymentHistroyBtn)
        const taxYear_paymentHistory = await Selector(this.paymentHistory_TaxYear).textContent;
        await t.expect(taxYear_paymentSchedule_BeforeSaveAndValidate).eql(taxYear_paymentHistory)
        CutomLogger.logger.log("info", " Paid tax year displayed in the Payment History as:" + taxYear_paymentHistory)
        CutomLogger.logger.log("info", "user entered 'Paid Date' for a tax year in the ‘Payment Schedule’ section, the record has moved to ‘Payment History’ section upon saving the data form with rules.")

    }

    public async verifyDueDateChangeInPaymentSchedule() {
        await t
            .click(this.nextPageBtn)
            .click(this.paymentScheduleBtn)
        const dueDate_paymentSchedule_BeforeRunRules = await Selector(this.dueDate_paymentSchedule_delete).textContent;
        CutomLogger.logger.log("info", " Due date displayed in payment schedule before save and validate :" + dueDate_paymentSchedule_BeforeRunRules)

        await t
            .click(this.dueDate_paymentSchedule_delete).pressKey("ctrl+a delete")
            .typeText(this.dueDate_paymentSchedule, DEFTestData_reg[0].DueDate)
            .click(this.paidDate_paymentSchedule).pressKey("ctrl+a delete")
            .typeText(this.paidDate_paymentSchedule, DEFTestData_reg[0].PaidDate)
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)
            .click(this.previuousPageBtn)
            .click(this.paymentHistroyBtn)

        const paid_taxYear_paymentHistory = await Selector(this.paymentHistory_TaxYear).textContent;
        CutomLogger.logger.log("info", " Paid tax year displayed in the Payment History after due date and paid date change in payment schedule as:" + paid_taxYear_paymentHistory)

        await t
            .click(this.nextPageBtn)
            .click(this.paymentScheduleBtn)
        const dueDate_paymentSchedule_AfterRulesRun = await Selector(this.dueDate_paymentSchedule_delete).textContent;
        CutomLogger.logger.log("info", " Due date displayed in payment schedule after save and validate as :" + dueDate_paymentSchedule_AfterRulesRun)
        await t.expect(dueDate_paymentSchedule_BeforeRunRules).eql(dueDate_paymentSchedule_AfterRulesRun);
        CutomLogger.logger.log("info", "Once a tax year has been paid and moved to Payment History, rules must regenerate a record in the payment schedule for the same tax year if the due date is different from the previously paid tax year")


    }

    public async verifyPaymentHistoryDelete() {
        await t
            .click(this.previuousPageBtn)
            .click(this.paymentHistroyBtn)
            .click(Selector(this.paymentHistory_selectFirstRecChk, { timeout: 1500 }))


        const taxYear_paymentHistory_beforeDelete = await Selector(this.paymentHistory_TaxYear).textContent;
        CutomLogger.logger.log("info", "Tax year value in payment history before deleting the record is:" + taxYear_paymentHistory_beforeDelete)

        await t
            .click(this.paymentHistory_deleteRecordBtn)
            .click(this.paymentHistory_deleteRecord_confirmationBtn)
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)
        CutomLogger.logger.log("info", "Record has deleted from Payment history")

        const taxYear_paymentHistory_afterDelete = await Selector(this.paymentHistory_TaxYear).textContent;
        CutomLogger.logger.log("info", "Tax year value in payment history after deleting the record is:" + taxYear_paymentHistory_afterDelete)
        await t.expect(taxYear_paymentHistory_beforeDelete).notEql(taxYear_paymentHistory_afterDelete);
        CutomLogger.logger.log("info", "deleted tax year is not longer displayed in the Payment History tab");

        await t
            .click(this.nextPageBtn)
            .click(this.paymentScheduleBtn)
        const taxYear_paymentSchedule_AfterDeleteFromHistory = await Selector(this.paymentSchedule_TaxYear).textContent;
        CutomLogger.logger.log("info", "Tax year value in payment schedule after deleting the record  from history is:" + taxYear_paymentSchedule_AfterDeleteFromHistory)

        const paidDate_paymentSchedule_AfterDeleteFromHistory = await Selector(this.paidDate_paymentSchedule).textContent;
        CutomLogger.logger.log("info", "Paid date  value in payment schedule after deleting the record  from history is:" + paidDate_paymentSchedule_AfterDeleteFromHistory)

        await t.expect(taxYear_paymentHistory_beforeDelete).eql(taxYear_paymentSchedule_AfterDeleteFromHistory);
        await t.expect(paidDate_paymentSchedule_AfterDeleteFromHistory).notContains('2018-12-01');
        CutomLogger.logger.log("info", "deleted tax year appeared in the Payment Schedule tab and it is displayed without Paid Date");
        CutomLogger.logger.log("info", "If user deletes a row from payment history and the record is saved with rules then rules updates the payment history child tab  and payment schedule child tab. Paid date is removed once is added back into payment schedule");

    }

    public async validateApplicationDateChangeInPatentRecord() {
        await t
            .click(this.paidDate_paymentSchedule).pressKey("ctrl+a delete")
            .typeText(this.paidDate_paymentSchedule, DEFTestData_reg[0].PaidDate)
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)
        CutomLogger.logger.log("info", "The record has moved from payment schedule to payment history to validate application date change process");

        await t
            .click(this.previuousPageBtn)
            .click(this.paymentHistroyBtn)
        const dueDate_paymentHistory_beforeAppDateChange = await Selector(this.dueDate_paymentHistory_get).textContent;
        CutomLogger.logger.log("info", "Due date in payment history before application date change:" + dueDate_paymentHistory_beforeAppDateChange)

        await t
            .click(this.nextPageBtn)
            .click(this.paymentScheduleBtn)

        const dueDate_paymentSchedule_beforeAppDateChange = await Selector(this.dueDate_paymentSchedule_get).textContent;
        CutomLogger.logger.log("info", "Due date in payment schedule before application date change:" + dueDate_paymentSchedule_beforeAppDateChange)

        await t
            .click(this.applicationDate).pressKey("ctrl+a delete")
            .typeText(this.applicationDate, DEFTestData_reg[0].ApplicationDate_Update)
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)

        const dueDate_paymentSchedule_afterAppDateChange = await Selector(this.dueDate_paymentSchedule_get).textContent;
        CutomLogger.logger.log("info", "Due date in payment schedule after application date change:" + dueDate_paymentSchedule_afterAppDateChange)

        await t.expect(dueDate_paymentSchedule_beforeAppDateChange).notEql(dueDate_paymentSchedule_afterAppDateChange);
        CutomLogger.logger.log("info", "The application date has been changed and new rules were applied successfully to the patent record");

        await t
            .click(this.previuousPageBtn)
            .click(this.paymentHistroyBtn)
        const dueDate_paymentHistory_afterAppDateChange = await Selector(this.dueDate_paymentHistory_get).textContent;
        CutomLogger.logger.log("info", "Due date in payment history before application date change:" + dueDate_paymentHistory_afterAppDateChange)
        await t.expect(dueDate_paymentHistory_beforeAppDateChange).eql(dueDate_paymentHistory_afterAppDateChange);
        CutomLogger.logger.log("info", "The application date has been changed and new rules were applied successfully to the patent record");

    }

    public async verifyPaymentHistoryGridFunctionalities() {
        await t
            .click(this.dueDate_paymentHistory_delete).pressKey("ctrl+a delete")
            .typeText(this.dueDate_paymentHistory, DEFTestData_reg[0].DueDate)
        CutomLogger.logger.log("info", "User is able to edit the values in payment history grid");

        await t

        const paymentHistoryGridSystemFieldValue_BeforeDelete = await Selector(this.paymentHistoryGrid_updateUser).textContent;
        CutomLogger.logger.log("info", "The update user system field value displayed in the grid before delete is : " + paymentHistoryGridSystemFieldValue_BeforeDelete);

        await t
            .click(this.paymentHistoryGrid_updateUser).pressKey("ctrl+a delete")
        const paymentHistoryGridSystemFieldValue_AfterDelete = await Selector(this.paymentHistoryGrid_updateUser).textContent;
        CutomLogger.logger.log("info", "The update user system field value displayed in the grid after delete is : " + paymentHistoryGridSystemFieldValue_AfterDelete);
        await t.expect(paymentHistoryGridSystemFieldValue_BeforeDelete).eql(paymentHistoryGridSystemFieldValue_AfterDelete);
        CutomLogger.logger.log("info", "User does not be able to edit system fields in the Payment History grid");

        const paymentHistoryGrid_totalRecords = await Selector(this.paymentHistoryGrid_totalRecords).textContent;
        CutomLogger.logger.log("info", "The total records in payment history grid dispalyed as : " + paymentHistoryGrid_totalRecords);
    }


    public async submitPatentDEFAndClickSaveBtn(dockNumber_patent: string, country_patent: string, caseType_patent: string, relationtype_patent: string, filingType_patent: string, filingNumber_patent: string, status_patent: string, parentFilingDate_patent: string, applicationNumber_patent: string, applicationDate_patent: string, patentNumber_patent: string, grantDate_patent: string) {
        CutomLogger.logger.log("info", "Fill in the data on the new Patent form");
        let random = Math.floor(Math.random() * 100000000);
        let dockNumber = dockNumber_patent + random;
        await t.click(this.docketNumber).pressKey("ctrl+a delete");
        await t.typeText(this.docketNumber, dockNumber);

        let clkxBtn_contry = await Selector("ca-large-list-lookup[name='vm.model.PAM$COUNTRY'] > kendo-combobox > span >span");
        await t.click(clkxBtn_contry);
        await t.wait(1000)

        let contryTxt = await Selector("ca-large-list-lookup[name='vm.model.PAM$COUNTRY'] >kendo-combobox > span >kendo-searchbar > input");
        await t.typeText(contryTxt, country_patent)
        await t.wait(1000)

        let clkxBtn_caseType = await Selector("ca-large-list-lookup[name='vm.model.PAM$CASETYPE'] > kendo-combobox > span >span");
        await t.click(clkxBtn_caseType);
        await t.wait(1000)

        let caseTypeTxt = await Selector("ca-large-list-lookup[name='vm.model.PAM$CASETYPE'] >kendo-combobox > span >kendo-searchbar > input");
        await t.typeText(caseTypeTxt, caseType_patent)
        await t.wait(1000)

        let clkxBtn_relationType = await Selector("ca-large-list-lookup[name='vm.model.PAM$RELATIONTYPE'] > kendo-combobox > span >span");
        await t.click(clkxBtn_relationType);
        await t.wait(1000)

        let relationTypeTxt = await Selector("ca-large-list-lookup[name='vm.model.PAM$RELATIONTYPE'] >kendo-combobox > span >kendo-searchbar > input");
        await t.typeText(relationTypeTxt, relationtype_patent)
        await t.wait(1000)

        let clkxBtn_filingType = await Selector("ca-large-list-lookup[name='vm.model.PAM$FILINGTYPE'] > kendo-combobox > span >span");
        await t.click(clkxBtn_filingType);
        await t.wait(1000)

        // let clkxBtn_filingType1 = await Selector("ca-large-list-lookup[name='vm.model.PAM$FILINGTYPE'] > kendo-combobox > span >span[title='clear']"); 
        // await t.click(clkxBtn_filingType1);
        // await t.wait(1000)


        let filingTypeTxt = await Selector("ca-large-list-lookup[name='vm.model.PAM$FILINGTYPE'] >kendo-combobox > span >kendo-searchbar > input");
        await t.typeText(filingTypeTxt, filingType_patent)
        await t.wait(1000)
        await t.typeText(this.filingNumberTxt, filingNumber_patent);

        let statusClk = await Selector("ca-large-list-lookup[name='vm.model.PAM$STATUS'] > kendo-combobox > span >span");
        await t.click(statusClk);
        await t.wait(1000);
        let querySelect_Ststus = await Selector("ca-large-list-lookup[name='vm.model.PAM$STATUS'] >kendo-combobox > span >kendo-searchbar > input");
        await t.typeText(querySelect_Ststus, status_patent);
        await t.wait(1000);


        await t
            .typeText(this.parentFilingDate, parentFilingDate_patent)
            .typeText(this.applicationNumberTxt, applicationNumber_patent)
            .typeText(this.applicationDate, applicationDate_patent)
            .typeText(this.patentNumberTxt, patentNumber_patent)
            .typeText(this.grantDate, grantDate_patent)
        //   .click(this.saveBtn);
        CutomLogger.logger.log("info", "Save was successfull. No rules were applied to the saved record.");

    }


    public async submitTrademarkDEFAndClickSaveBtn(dockNumber_tm: string, country_tm: string, caseType_tm: string, filingType_tm: string, filingNumber_tm: string, status_tm: string, attorney_tm: string, currentApplicationNumber_tm: string, originalApplicationNumber_tm: string, currentApplicationDate_tm: string, originalApplicationDate_tm: string, currentRegistrationDate_tm: string, originalRegistrationDate_tm: string) {
        CutomLogger.logger.log("info", "Fill in the data on the new Patent form");
        let random = Math.floor(Math.random() * 100000000);
        let dockNumber = dockNumber_tm + random;
        await t.click(this.docketNumber).pressKey("ctrl+a delete");
        await t.typeText(this.docketNumber, dockNumber);


        let clkxBtn_contry = await Selector("ca-large-list-lookup[name='vm.model.TMM$COUNTRY'] > kendo-combobox > span >span");
        await t.click(clkxBtn_contry);
        await t.wait(1000)

        let contryTxt = await Selector("ca-large-list-lookup[name='vm.model.TMM$COUNTRY'] >kendo-combobox > span >kendo-searchbar > input");
        await t.typeText(contryTxt, country_tm)
        await t.wait(1000)

        let clkxBtn_caseType = await Selector("ca-large-list-lookup[name='vm.model.TMM$CASETYPE'] > kendo-combobox > span >span");
        await t.click(clkxBtn_caseType);
        await t.wait(1000)

        let caseTypeTxt = await Selector("ca-large-list-lookup[name='vm.model.TMM$CASETYPE'] >kendo-combobox > span >kendo-searchbar > input");
        await t.typeText(caseTypeTxt, caseType_tm)
        await t.wait(1000)

        //  let clkxBtn_relationType = await Selector("ca-large-list-lookup[name='vm.model.TMM$RELATIONTYPE'] > kendo-combobox > span >span");
        //  await t.click(clkxBtn_relationType);
        //  await t.wait(1000)

        //let relationTypeTxt = await Selector("ca-large-list-lookup[name='vm.model.TMM$RELATIONTYPE'] >kendo-combobox > span >kendo-searchbar > input");
        //await t.typeText(relationTypeTxt, relationtype_patent)
        //await t.wait(1000)

        let clkxBtn_filingType = await Selector("ca-large-list-lookup[name='vm.model.TMM$FILINGTYPE'] > kendo-combobox > span >span > span")
        await t.click(clkxBtn_filingType);
        await t.wait(1000)

        let clkxBtn_filingType1 = await Selector("ca-large-list-lookup[name='vm.model.TMM$FILINGTYPE'] > kendo-combobox > span >span[title='clear']");
        await t.click(clkxBtn_filingType1);
        await t.wait(1000)

        let filingTypeTxt = await Selector("ca-large-list-lookup[name='vm.model.TMM$FILINGTYPE'] >kendo-combobox > span >kendo-searchbar > input");
        await t.typeText(filingTypeTxt, filingType_tm)
        await t.wait(1000)
        await t.typeText(this.filingNumberTxt_tm, filingNumber_tm);

        let statusClk = await Selector("ca-large-list-lookup[name='vm.model.TMM$STATUS'] > kendo-combobox > span >span");
        await t.click(statusClk);
        await t.wait(1000);
        let querySelect_Ststus = await Selector("ca-large-list-lookup[name='vm.model.TMM$STATUS'] >kendo-combobox > span >kendo-searchbar > input");
        await t.typeText(querySelect_Ststus, status_tm);
        await t.wait(1000);

        let clkxBtn_attorney = await Selector("ca-large-list-lookup[name='vm.model.TMM$ATTORNEY'] > kendo-combobox > span >span > span");
        await t.click(clkxBtn_attorney);
        await t.wait(1000)

        let attorneyTxt = await Selector("ca-large-list-lookup[name='vm.model.TMM$ATTORNEY'] >kendo-combobox > span >kendo-searchbar > input");
        await t.typeText(attorneyTxt, attorney_tm)
        await t.wait(1000)


        await t
            .typeText(this.currentApplicationNumberTxt, currentApplicationNumber_tm)
            .typeText(this.originalApplicationNumberTxt, originalApplicationNumber_tm)
            .typeText(this.currentApplicationDateTxt, currentApplicationDate_tm)
            .typeText(this.originalApplicationDateTxt, originalApplicationDate_tm)
            .typeText(this.currentRegistrationDateTxt, currentRegistrationDate_tm);
        await t.typeText(this.originalRegistrationDateTxt, originalRegistrationDate_tm);

        //   .click(this.saveBtn);
        CutomLogger.logger.log("info", "Save was successfull. No rules were applied to the saved record.");

    }


    public async clkSaveAndValidateBtn() {
        await t
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn);
        CutomLogger.logger.log("info", "User clicked on Save And Validate button and Rules ran successfully");
    }

    public async clkPaymentScheduleChildTab() {
        await t
            .click(this.nextPageBtn)
            .click(this.nextPageBtn)
            .expect(this.paymentScheduleBtn.exists).ok()
            .click(this.paymentScheduleBtn);
        CutomLogger.logger.log("info", "User clicked on payment schedule child tab");

    }

    public async verifyPaymentScheduleTabAfterSave() {
        await t
            .click(this.nextPageBtn)
            .click(this.nextPageBtn)
            .expect(this.paymentScheduleBtn.exists).ok()
            .click(this.paymentScheduleBtn);

        const gridValue_paymentSchedule = await Selector(this.paymentSchedule_GridData).textContent;
        await t.expect(this.paymentHistry_GridData.innerText).contains('No records available.');
        CutomLogger.logger.log("info", "No rules have ever run against the case record the Payment Schedule grid only displayED with column headers and with the message No records available, This is the default state");
        CutomLogger.logger.log("info", "The grid displayED all columns that were configured for the Data Entry Template record opened in");
        CutomLogger.logger.log("info", "There is no [Add New] button");
        await t
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn);
        CutomLogger.logger.log("info", "User clicked on Save And Validate button and Rules ran successfully");

        const taxYear_paymentSchedule_AfterSaveAndValidate = await Selector(this.paymentSchedule_TaxYear).textContent;
        CutomLogger.logger.log("info", "Tax year value in payment schedule after deleting the record  from history is:" + taxYear_paymentSchedule_AfterSaveAndValidate)
        await t.expect(taxYear_paymentSchedule_AfterSaveAndValidate).contains(2);
        CutomLogger.logger.log("info", "Payment Schedule grid displayed all opened tax years (current and future) of the patent record")

        const paymentSchedule_totalRecords = await Selector(this.paymentSchedule_totalRecords).textContent;
        CutomLogger.logger.log("info", "The total records were displayed in payment schedule gris is:" + paymentSchedule_totalRecords);

        const taxyear_paymentSchedule_beforeDelete = await Selector(this.paymentSchedule_TaxYear).textContent;
        CutomLogger.logger.log("info", "The tax year value before delete:" + taxyear_paymentSchedule_beforeDelete);


        await t
            .click(Selector(this.selectPaymentScheduleRecordchk, { timeout: 1500 }))
            .click(this.paymentSchedule_deleteRecordBtn)
            .click(this.paymentSchedule_deleteRecord_confirmationBtn)

        CutomLogger.logger.log("info", "The user is able to delete a row from the Payment Schedule child tab");
        await t.click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)
            .click(this.previuousPageBtn)
            .click(this.paymentHistroyBtn)
            .click(this.nextPageBtn)
            .click(this.paymentScheduleBtn);

        const taxyear_paymentSchedule_afterDelete = await Selector(this.paymentSchedule_TaxYear).textContent;
        CutomLogger.logger.log("info", "The tax year value before after:" + taxyear_paymentSchedule_afterDelete);
        await t.expect(taxyear_paymentSchedule_beforeDelete).eql(taxyear_paymentSchedule_afterDelete)
        CutomLogger.logger.log("info", "the deleted tax is successfully added back in the payment schedule after save and validate");

        const dueDate_paymentSchedule = await Selector(this.dueDate_paymentSchedule_get).textContent;
        CutomLogger.logger.log("info", "Due date in payment schedule displayed as:" + dueDate_paymentSchedule)
        //  await t.expect(dueDate_paymentSchedule).contains('/2')

        const dropDate_paymentSchedule = await Selector(this.dropDate_paymentSchedule).textContent;
        CutomLogger.logger.log("info", "Paid date in payment schedule displayed as:" + dropDate_paymentSchedule)
        //  await t.expect(dropDate_paymentSchedule).contains('/2')
        CutomLogger.logger.log("info", "The Due Date and Drop Date calculated by rules engine for each of the tax years must display in the ‘Payment Schedule’ grid.");
    }

    public async verifyEditApplicationDateInFilingSection() {
        const dueDate_paymentSchedule_beforeAppDateChange = await Selector(this.dueDate_paymentSchedule_get).textContent;
        CutomLogger.logger.log("info", "Due date in payment schedule displayed befor application date change:" + dueDate_paymentSchedule_beforeAppDateChange)

        await t
            .click(this.applicationDate).pressKey("ctrl+a delete")
            .typeText(this.applicationDate, DEFTestData_reg[0].ApplicationDate_Update1)
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)
            .click(this.previuousPageBtn)
            .click(this.paymentHistroyBtn)
            .click(this.nextPageBtn)
            .click(this.paymentScheduleBtn);

        const dueDate_paymentSchedule_AfterAppDateChange = await Selector(this.dueDate_paymentSchedule_get).textContent;
        CutomLogger.logger.log("info", "Due date in payment schedule displayed after application date change:" + dueDate_paymentSchedule_AfterAppDateChange)
        await t.expect(dueDate_paymentSchedule_AfterAppDateChange).notEql(dueDate_paymentSchedule_beforeAppDateChange)
        CutomLogger.logger.log("info", "Payment schedule information were updated when rules re-ran");

    }

    public async verifyEditPaymentScheduleEntries() {
        await t
            .click(this.dueDate_paymentSchedule_delete).pressKey("ctrl+a delete")
            .typeText(this.dueDate_paymentSchedule, DEFTestData_reg[0].DueDate_update)

            .click(this.projectedDue_paymentSchedule_delete).pressKey("ctrl+a delete")
            .typeText(this.projectedDue_paymentSchedule, DEFTestData_reg[0].ProjectedDue)

            .click(this.paymentSchedule_TaxYear).pressKey("ctrl+a delete")
            .typeText(this.paymentSchedule_TaxYear_enter, DEFTestData_reg[0].TaxYear)

            .click(this.dropDate_paymentSchedule).pressKey("ctrl+a delete")
            .typeText(this.dropDate_paymentSchedule, DEFTestData_reg[0].DropDate)

        CutomLogger.logger.log("info", "User is able to edit the values in payment schedule grid");

        await t.click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)
        CutomLogger.logger.log("info", "The rules re-ran after clicking on save and validate button, the rules has updated Due Date, Projected Due, Drop Date back to the original ");

    }

    public async addPaidNotestoPaymentScheduleEntries() {
        await t
            .click(this.paymentSchedule_addPaidNotes).pressKey("ctrl+a delete")
            .typeText(this.paymentSchedule_addPaidNotes, DEFTestData_reg[0].AddPaidNotes)
        CutomLogger.logger.log("info", "User is able to add paid notes to the paymnet schedule entries");

        await t.click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)

        CutomLogger.logger.log("info", "The rules re-ran successfully after updateing the add notes field in the payment schedule grid");
    }

    public async updateCountryRegionInDEFAndValidate(update_Country: string) {
        let clkxBtn_contry_iran = await Selector('form#dataEntryForm > ca-tabs > div > div > ca-tab > div > div > div:nth-of-type(2) > div > ca-large-list-lookup > kendo-combobox > span > span').nth(0);
        await t.click(clkxBtn_contry_iran)
            .wait(500);

        let contryTxt_iran = await Selector("form#dataEntryForm > ca-tabs > div > div > ca-tab > div > div > div:nth-of-type(2) > div > ca-large-list-lookup > kendo-combobox > span > kendo-searchbar > input").nth(0);
        await t.typeText(contryTxt_iran, update_Country)
            .wait(2000)
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)
        CutomLogger.logger.log("info", "The rules re-ran successfully after updateing country name as Iran");

        const paymentSchedule_feeTypeInGrid = await Selector(this.paymentSchedule_feeTypeInGrid).textContent;
        await t.expect(paymentSchedule_feeTypeInGrid).contains('FeeTypeId')
        CutomLogger.logger.log("info", "The feetype grid column is displayed in Grid for the country Iran:" + paymentSchedule_feeTypeInGrid)

        const paymentSchedule_feeType_taxes_description = await Selector(this.paymentSchedule_feeType_taxes).textContent;
        await t.expect(paymentSchedule_feeType_taxes_description).contains('Taxes')
        CutomLogger.logger.log("info", "Taxes displayed to the user with fee type description in grid :" + paymentSchedule_feeType_taxes_description)

        const paymentSchedule_feeType_working_description = await Selector(this.paymentSchedule_feeType_working).textContent;
        if (paymentSchedule_feeType_working_description == 'Working') {
            await t.expect(paymentSchedule_feeType_working_description).contains('Working')
            CutomLogger.logger.log("info", "Working displayed to the user with fee type description in grid :" + paymentSchedule_feeType_working_description)

        }
        else {
            console.log("the coloumn order has got changes to Taxes instead working");
        }

        const paymentSchedule_dueDate = await Selector(this.dueDate_paymentSchedule_delete).textContent;
        const paymentSchedule_dropDate = await Selector(this.dropDate_paymentSchedule).textContent;
        CutomLogger.logger.log("info", "Due date dispalyed in grid as :" + paymentSchedule_dueDate + " Drop date dispalyed in grid as : " + paymentSchedule_dropDate)
        await t.expect(paymentSchedule_dueDate).notEql(paymentSchedule_dropDate);
    }


    public async connectToDatabaseAndRunQuery(server: string, database: string, userid: string, password: string, queryParameters: string) {
        const sql:
            SqlClient = require("msnodesqlv8");
        const connectionString = "Driver={SQL Server Native Client 11.0};Server={" + server + "};Database={" + database + "};Uid={" + userid + "};Pwd={" + password + "}";
        console.log(connectionString);
        await t.wait(5000);
        const query = "SELECT * FROM dbo.FeeAmounts where FeeGroupID in (" + queryParameters + ") order by taxyear";
        console.log(query);

        sql.query(connectionString, query, (err, rows) => {
            console.log("Query ran successfully for legacy fee group ids " + queryParameters);
            console.log(rows)
        });
        await t.wait(5000);
    }

    public async verifyPaymentScheduleTabForTaxPaidForLife() {
        await t
            .click(this.nextPageBtn)
            .click(this.nextPageBtn)
            .expect(this.paymentScheduleBtn.exists).ok()
            .click(this.paymentScheduleBtn);

        const paymentSchedule_feeTypeInGrid = await Selector(this.paymentSchedule_feeTypeInGrid).textContent;
        await t.expect(paymentSchedule_feeTypeInGrid).contains('FeeTypeId')
        CutomLogger.logger.log("info", "The feetype grid column is displayed in Grid for the country Iran:" + paymentSchedule_feeTypeInGrid)

        const paymentSchedule_feeType_taxes_description = await Selector(this.paymentSchedule_feeType_taxes).textContent;
        await t.expect(paymentSchedule_feeType_taxes_description).contains('Taxes')
        CutomLogger.logger.log("info", "Taxes displayed to the user with fee type description in grid :" + paymentSchedule_feeType_taxes_description)

        const paymentSchedule_feeType_working_description = await Selector(this.paymentSchedule_feeType_working).textContent;
        await t.expect(paymentSchedule_feeType_working_description).contains('Working')
        CutomLogger.logger.log("info", "Working displayed to the user with fee type description in grid :" + paymentSchedule_feeType_working_description)
        CutomLogger.logger.log("info", "Payment Schedule child tab must display all open tax years with both Taxes and Workings fee types");
    }

    public async clkTaxPaidForLifeinFilingSectionAndValidate() {
        await t
            .click(Selector(this.paymentSchedule_taxPaidForLifeChk, { timeout: 1500 }))
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)
            .click(this.previuousPageBtn)
            .click(this.paymentHistroyBtn)

        const paymentHistory_feeType_taxes_description = await Selector(this.paymentSchedule_feeType_taxes).textContent;
        await t.expect(paymentHistory_feeType_taxes_description).contains('Taxes')
        CutomLogger.logger.log("info", "Taxes displayed to the user with fee type description in grid :" + paymentHistory_feeType_taxes_description)

        CutomLogger.logger.log("info", "all entries from the Payment Schedule with fee type of Taxes are moved to the Payment History with a paid date of when the record was saved with rules")

        await t
            .click(this.nextPageBtn)
            .click(this.paymentScheduleBtn);

        const paymentSchedule_feeType_working_description = await Selector(this.paymentSchedule_feeType_working).textContent;
        await t.expect(paymentSchedule_feeType_working_description).contains('Working')
        CutomLogger.logger.log("info", "Working displayed to the user with fee type description in grid :" + paymentSchedule_feeType_working_description)

        CutomLogger.logger.log("info", "All entries with fee type Workings remain in the Payment Schedule tab")

        await t.click(Selector(this.paymentSchedule_taxPaidForLifeChk, { timeout: 1500 }))

        const paymentSchedule_taxPaidForLifeUnChk_errorMsg = await Selector(this.paymentSchedule_taxPaidForLifeUnChk_errorMsg).textContent;
        await t.expect(paymentSchedule_taxPaidForLifeUnChk_errorMsg).contains('Some tax years may have been moved to payment history with a Paid Date. Please delete the appropriate tax year records from the payment history section and run rules if those tax years are needed in payment schedule again')
        CutomLogger.logger.log("info", "The error message dispaled after user uncheck the tax paid for life check box  :" + paymentSchedule_taxPaidForLifeUnChk_errorMsg)

        await t.click(this.paymentSchedule_taxPaidForLifeUnChk_errorMsg_okBtn)
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)

        const paymentSchedule_feeType_working_description1 = await Selector(this.paymentSchedule_feeType_working).textContent;
        await t.expect(paymentSchedule_feeType_working_description).contains('Working')
        CutomLogger.logger.log("info", "Working displayed to the user with fee type description in grid :" + paymentSchedule_feeType_working_description1)
        CutomLogger.logger.log("info", "Payment Schedule child tab continue to display tax years only for Workings fee type")
    }

    public async deleteAllEntriesFromPaymentHistoryForTaxPaidForLife() {

        await t
            .click(this.previuousPageBtn)
            .click(this.paymentHistroyBtn)
            .click(Selector(this.paymentHistory_taxPaidForLife_selectAllBtn, { timeout: 1500 }))
            .click(this.paymentHistory_taxPaidForLife_deleteBtn)
            .click(this.paymentHistory_deleteRecord_confirmationBtn)
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)
            .click(this.nextPageBtn)
            .click(this.paymentScheduleBtn);

        const paymentHistory_feeType_taxes_description = await Selector(this.paymentSchedule_feeType_taxes).textContent;
        await t.expect(paymentHistory_feeType_taxes_description).contains('Taxes')
        CutomLogger.logger.log("info", "Taxes displayed to the user with fee type description in grid :" + paymentHistory_feeType_taxes_description)
        CutomLogger.logger.log("info", "The rules service re-produced the tax years in payment schedule child tab for Taxes fee type.")
    }


    public async validateOverAllFunctionalitesOfPaymentSchedule() {
        await t
            .click(this.nextPageBtn)
            .click(this.nextPageBtn)
            .expect(this.paymentScheduleBtn.exists).ok()
            .click(this.paymentScheduleBtn)
            .click(this.paidDate_paymentSchedule)
        CutomLogger.logger.log("info", "The payment schedule child tab is present");

        const paymentScheduleGridSystemFieldValue_BeforeDelete = await Selector(this.paymentSchedule_systemField).textContent;
        CutomLogger.logger.log("info", "The currency type system field value displayed in the grid before delete is : " + paymentScheduleGridSystemFieldValue_BeforeDelete);

        await t
            .click(this.paymentSchedule_systemField).pressKey("ctrl+a delete")
        const paymentScheduleGridSystemFieldValue_AfterDelete = await Selector(this.paymentSchedule_systemField).textContent;
        CutomLogger.logger.log("info", "The currency type system field value displayed in the grid after delete is : " + paymentScheduleGridSystemFieldValue_AfterDelete);
        await t.expect(paymentScheduleGridSystemFieldValue_BeforeDelete).eql(paymentScheduleGridSystemFieldValue_AfterDelete);
        CutomLogger.logger.log("info", "User does not be able to edit system fields in the Payment Schedule grid");

        await t
            .click(this.dueDate_paymentSchedule_delete).pressKey("ctrl+a delete")
            .typeText(this.dueDate_paymentSchedule, DEFTestData_reg[0].DueDate)
            .click(this.queryLink);

        const paymentSchedule_unsaveCheages_errorMsg = await Selector(this.paymentSchedule_unSaved_errorMsg).textContent;
        CutomLogger.logger.log("info", "The error message displayed after user left without saving changes in payment schedule tab:" + paymentSchedule_unsaveCheages_errorMsg)

        await t
            .expect(paymentSchedule_unsaveCheages_errorMsg).contains('Unsaved changes will be lost. Do you want to continue?')
            .expect(this.paymentSchedule_unSaved_changes_continueBtn.exists).ok()
            .expect(this.paymentSchedule_unSaved_changes_cancelBtn.exists).ok()
        CutomLogger.logger.log("info", "The [continue] and [cancel] buttons are present in the error popup");

        await t.click(this.paymentSchedule_unSaved_changes_cancelBtn)
        CutomLogger.logger.log("info", "The message closed, focus returned to the DEF screen, the action is not completed, and the changes are maintained");

        await t.click(this.queryLink)
            .click(this.paymentSchedule_unSaved_changes_continueBtn)
        CutomLogger.logger.log("info", "Query screen is opened. User lost all unsaved data.");


    }

    public async validateOverAllFunctionalitesOfPaymentHistory() {
        await t
            .click(this.nextPageBtn)
            .expect(this.paymentHistroyBtn.exists).ok()
            .click(this.paymentHistroyBtn);
        CutomLogger.logger.log("info", "The payment history child tab is present");

        await t
            .click(this.nextPageBtn)
            .expect(this.paymentScheduleBtn.exists).ok()
            .click(this.paymentScheduleBtn)
            .click(this.paidDate_paymentSchedule)
        CutomLogger.logger.log("info", "The payment schedule child tab is present");

        await t
            .click(this.paidDate_paymentSchedule)
            .click(this.paidDate_paymentSchedule).pressKey("ctrl+a delete")
            .typeText(this.paidDate_paymentSchedule, DEFTestData_reg[0].PaidDate)
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)
        CutomLogger.logger.log("info", "User has created a test record to vaerify payment history functionalities");

        await t
            .click(this.previuousPageBtn)
            .click(this.paymentHistroyBtn)

        const paymentHistoryGridSystemFieldValue_BeforeDelete = await Selector(this.paymentHistoryGrid_updateUser).textContent;
        CutomLogger.logger.log("info", "The update user system field value displayed in the grid before delete is : " + paymentHistoryGridSystemFieldValue_BeforeDelete);

        await t
            .click(this.paymentHistoryGrid_updateUser).pressKey("ctrl+a delete")
        const paymentHistoryGridSystemFieldValue_AfterDelete = await Selector(this.paymentHistoryGrid_updateUser).textContent;
        CutomLogger.logger.log("info", "The update user system field value displayed in the grid after delete is : " + paymentHistoryGridSystemFieldValue_AfterDelete);
        await t.expect(paymentHistoryGridSystemFieldValue_BeforeDelete).eql(paymentHistoryGridSystemFieldValue_AfterDelete);
        CutomLogger.logger.log("info", "User does not be able to edit system fields in the Payment Schedule grid");

        await t
            .click(this.dueDate_paymentHistory_delete).pressKey("ctrl+a delete")
            .typeText(this.dueDate_paymentHistory, DEFTestData_reg[0].DueDate)
            .click(this.queryLink);

        const paymentHistory_unsaveCheages_errorMsg = await Selector(this.paymentSchedule_unSaved_errorMsg).textContent;
        CutomLogger.logger.log("info", "The error message displayed after user left without saving changes in payment schedule tab:" + paymentHistory_unsaveCheages_errorMsg)

        await t
            .expect(paymentHistory_unsaveCheages_errorMsg).contains('Unsaved changes will be lost. Do you want to continue?')
            .expect(this.paymentSchedule_unSaved_changes_continueBtn.exists).ok()
            .expect(this.paymentSchedule_unSaved_changes_cancelBtn.exists).ok()
        CutomLogger.logger.log("info", "The [continue] and [cancel] buttons are present in the error popup");

        await t.click(this.paymentSchedule_unSaved_changes_cancelBtn)
        CutomLogger.logger.log("info", "The message closed, focus returned to the DEF screen, the action is not completed, and the changes are maintained");

        await t.click(this.queryLink)
            .click(this.paymentSchedule_unSaved_changes_continueBtn)
        CutomLogger.logger.log("info", "Query screen is opened. User lost all unsaved data.");

    }

    public async validatePaymentStatusInPaymentScheduleAndHistory(paymentStatus_schedule: string, paymentStatus_history: string) {
        await t
            .click(this.nextPageBtn)
            .click(this.nextPageBtn)
            .expect(this.paymentScheduleBtn.exists).ok()
            .click(this.paymentScheduleBtn);

        let contryTxt = await Selector("kendo-grid#child-record-grid > div > kendo-grid-list > div > div > table > tbody > tr > td:nth-of-type(8)").nth(0);
        let paymentStatusDrpDwn = await Selector('#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(8) > ca-editable-grid-cell > div > ca-large-list-lookup > kendo-combobox > span > span > span');

        await t.click(contryTxt)
        await t.click(paymentStatusDrpDwn);
        let querySelect_Status = await Selector('kendo-list > div > ul > li').find('span');
        await t.click(querySelect_Status.withExactText(paymentStatus_schedule))
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)

        await t
            .click(this.paidDate_paymentSchedule)
            .click(this.paidDate_paymentSchedule).pressKey("ctrl+a delete")
            .typeText(this.paidDate_paymentSchedule, DEFTestData_reg[0].PaidDate)
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)
            .click(this.previuousPageBtn)
            .click(this.paymentHistroyBtn)

        let paymentTxt = await Selector("kendo-grid#child-record-grid > div > kendo-grid-list > div > div > table > tbody > tr > td:nth-of-type(8)").nth(0);
        let paymentStatusDrpDwn_history = await Selector('#child-record-grid > div > kendo-grid-list > div > div.k-grid-table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(8) > ca-editable-grid-cell > div > ca-large-list-lookup > kendo-combobox > span > span > span');

        await t.click(paymentTxt)
        await t.click(paymentStatusDrpDwn_history);
        let querySelect_Status_history = await Selector('kendo-list > div > ul > li').find('span');
        await t.click(querySelect_Status_history.withExactText(paymentStatus_history))
            .click(this.saveAndValidateBtn)
            .click(this.okPopupBtn)
        CutomLogger.logger.log("info", "User has successfully validated payment status column update in payment schedule and history tabs");
    }

    public async updateFilingNumber() {
        await t.typeText(this.filingNumberTxt, "90056");
        CutomLogger.logger.log("info", "User has updated the filing number field in Patent DEF");
    }

    public async updateCountry(updatecountry: string) {
        let clkxBtn_contry_iran = await Selector('form#dataEntryForm > ca-tabs > div > div > ca-tab > div > div > div:nth-of-type(2) > div > ca-large-list-lookup > kendo-combobox > span > span').nth(0);
        await t.click(clkxBtn_contry_iran)
            .wait(1500);

        let contryTxt_iran = await Selector("form#dataEntryForm > ca-tabs > div > div > ca-tab > div > div > div:nth-of-type(2) > div > ca-large-list-lookup > kendo-combobox > span > kendo-searchbar > input").nth(0);
        await t.typeText(contryTxt_iran, updatecountry);
        await t.wait(1500);
    }

    //********************** */Regression testcase methods added by Kumar Kullan on 12/14/2018-END**********************************************************************
}
