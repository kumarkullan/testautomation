import { Selector } from "testcafe";
import CutomLogger from "../../log";
import * as cloneDeep from "../../node_modules/lodash/cloneDeep";
import BaseQueryPage from "../../pageObjects/BaseQueryPage";
import DashboardPage from "../../pageObjects/DashboardPage";
import DataEntryFormPage from "../../pageObjects/DataEntryFormPage";
import LoginPage from "../../pageObjects/LoginPage";
import MessageCenterPage from "../../pageObjects/MessageCenterPage";
import PartyPage from "../../pageObjects/PartyPage";
import QueryPage from "../../pageObjects/QueryPage";
import ReportsPage from "../../pageObjects/ReportsPage";
import WeblinksPage from "../../pageObjects/WeblinksPage";
import * as DV from "../../testData/default-data";
import { DocketingPortalApiUrls } from "../../testData/urls";
import ContentGroupsFactory from "../../testFactories/content-groups-factory";
import CommonService from "../../testServices/common-service";
let DEFTestData = require("../../testData/DEFTestData.json");

let dpURLS = require("../../testData/dpurls.json");
let login = require("../../testData/login_r.json");
let DEFTestData_reg = require("../../testData/DEFTestData_Reg.json");

const loginpage = new LoginPage();
const messagecenterpage = new MessageCenterPage();
const querypage = new QueryPage();
const dashboardpage = new DashboardPage();
const partypage = new PartyPage();
const weblinkspage = new WeblinksPage();
const commonService = new CommonService();
const reportspage = new ReportsPage();
const defpage = new DataEntryFormPage();
const basequerypage = new BaseQueryPage()
let userName: string;

fixture`Health check tests of Docketing Portal Application`
    .page(dpURLS[0].LoginURL)

    .beforeEach(async t => {
        await t.maximizeWindow();
        await loginpage.userLogin(login[0].username, login[0].passwordField);
    });

test("Test_001_4_Verify_Patent_Data_Entry", async (t) => {
    CutomLogger.logger.log("info", "=============validate Patent DEF creation and edit process-STARTED=============");
    let docketNumberPA: string;
    await defpage.SelectItemFromDefList_DEF("Patent DEF");    //  await defpage.submitPatentDEFAndClickSaveBtn(DEFTestData[0].DocketNumber,DEFTestData_reg[0].Country, DEFTestData_reg[0].CaseType, DEFTestData_reg[0].RelationType, DEFTestData_reg[0].FilingType, DEFTestData_reg[0].FilingNumber, DEFTestData_reg[0].Status, DEFTestData_reg[0].ParentFilingDate, DEFTestData_reg[0].ApplicationNumber, DEFTestData_reg[0].ApplicationDate, DEFTestData_reg[0].PatentNumber, DEFTestData_reg[0].GrantDate); 
    await defpage.submitPatentDEFAndClickSaveBtn(DEFTestData_reg[0].DocketNumber, DEFTestData_reg[0].Country, DEFTestData_reg[0].CaseType, DEFTestData_reg[0].RelationType, DEFTestData_reg[0].FilingType, DEFTestData_reg[0].FilingNumber, DEFTestData_reg[0].Status, DEFTestData_reg[0].ParentFilingDate, DEFTestData_reg[0].ApplicationNumber, DEFTestData_reg[0].ApplicationDate, DEFTestData_reg[0].PatentNumber, DEFTestData_reg[0].GrantDate);
    docketNumberPA = await defpage.updatePatentDEFAndClickSaveAndValidateBtn(DEFTestData[3].DocketNumber);
    CutomLogger.logger.log("info", "Patent Docket Number: " + docketNumberPA);
    await dashboardpage.navigateToItemMenu("Query");
    await querypage.selectQueryFromListByName_PA("PA All Cases");
    await querypage.isExistsQueryResultsLable();
    await querypage.isExistsTotalRecordCountLable();
    await querypage.isExistsQueryResultsName("PA All Cases");
    await querypage.fillBuildComplexQueriesAndClickShowResults("Docket Number", "Equal", docketNumberPA);
    await querypage.openFirstRecord();
    await defpage.updateTextValue(DEFTestData[4].updatedDocketNumber_pat);
    CutomLogger.logger.log("info", "=============validate Patent DEF creation and edit process-COMPLETED=============");
});

test("Test_002_4_Verify_TradeMark_Data_Entry", async (t) => {
    CutomLogger.logger.log("info", "=============validate Trademark DEF creation and edit process-STARTED=============");
    let docketNumberTM: string;
    await defpage.SelectItemFromDefList_DEF("Trademark DEF");    //  await defpage.submitPatentDEFAndClickSaveBtn(DEFTestData[0].DocketNumber,DEFTestData_reg[0].Country, DEFTestData_reg[0].CaseType, DEFTestData_reg[0].RelationType, DEFTestData_reg[0].FilingType, DEFTestData_reg[0].FilingNumber, DEFTestData_reg[0].Status, DEFTestData_reg[0].ParentFilingDate, DEFTestData_reg[0].ApplicationNumber, DEFTestData_reg[0].ApplicationDate, DEFTestData_reg[0].PatentNumber, DEFTestData_reg[0].GrantDate); 
    await defpage.submitTrademarkDEFAndClickSaveBtn(DEFTestData_reg[4].DocketNumber, DEFTestData_reg[4].Country, DEFTestData_reg[4].CaseType, DEFTestData_reg[4].FilingType, DEFTestData_reg[4].FilingNumber, DEFTestData_reg[4].Status,DEFTestData_reg[4].Attorney,DEFTestData_reg[4].CurrentApplicationNumber, DEFTestData_reg[4].OriginalApplicationNumber,DEFTestData_reg[4].CurrentApplicationDate,DEFTestData_reg[4].OriginalApplicationDate,DEFTestData_reg[4].CurrentRegistrationDate,DEFTestData_reg[4].OriginalRegistrationDate);
    docketNumberTM = await defpage.updateTradeMarkDEFAndClickSaveAndValidateBtn(DEFTestData[0].DocketNumber);
    CutomLogger.logger.log("info", "Trademark Docket Number: " + docketNumberTM);
    await dashboardpage.navigateToItemMenu("Query");
    await querypage.selectQueryFromListByName_TM("TM All Cases"); 
    await querypage.fillBuildComplexQueriesAndClickShowResults("Docket Number", "Equal", docketNumberTM);
    await querypage.openFirstRecord();
    await defpage.updateTextValue(DEFTestData[4].updatedDocketNumber_pat);
    CutomLogger.logger.log("info", "=============validate Trademark DEF creation and edit process-COMPLETED=============");
});

test("Test_004_verifyQueryResults", async () => {
    CutomLogger.logger.log("info", "=============Verify Query results records list-STARTED=============");
    await querypage.validateSearchQueryArea();
    await querypage.validateQueryListArea();
    await querypage.selectQueryFromListByName_PA("PA All Cases");
    await querypage.fillBuildComplexQueriesAndClickShowResults("Docket Number", "Contains", "A");
    await querypage.resetQueryFilters();
    await querypage.selectSeveralRecordsFromQuery(1);
    await querypage.openQueryRecordInBrowser();
    await querypage.selectSeveralRecordsFromQuery(1);
    await querypage.openExportMenu();
    await querypage.validateExportMenuBarOptions();
    await querypage.validateExcelExportFunctionality("ExportedFile.xlsx");
    await querypage.openExportMenu();
    await querypage.validateTxtExportFunctionality("ExportedFile.txt");
    await querypage.validateMoreMenuOptions();
    await querypage.selectCollaborateFromMoreMenuAndValidate();
    await querypage.selectDuplicateFromMoreMenuAndValidate("MK - autokey patent to");
    await querypage.selectEmailFromMoreMenuAndValidate("New Email Template");
    await querypage.selectFormLetterFromMoreMenuAndValidate();
    // await querypage.selectProcessRulesFromMoreMenuAndValidate();
    // await querypage.selectReportsFromMoreMenuAndValidate("kate international");
    // await querypage.selectFirstRecord();
    // await querypage.selectVariablesLinkFromMoreMenuAndValidate("CNN LINK");
    CutomLogger.logger.log("info", "=============Verify Query results records list-COMPLETED=============");
});
