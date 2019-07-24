import {ClientFunction, Selector, t} from "testcafe";
import CutomLogger from "../log";
import BasePage from "./BasePage";

export default class ReportsPage extends BasePage {
    public reportsLink = Selector(".nav-menu__link").nth(4);
    public automationBasicReportLnk = Selector(".nav-menu__link").nth(4);

    public async SelectReports(reports: string) {
        let reportsLink   = await Selector(".reportItem");
        await t.click(reportsLink.withText(reports));

        const getLocation = ClientFunction(() => document.location.href);
        await t .expect(getLocation()).contains("ReportViewer.aspx?tempFileId");
        CutomLogger.logger.log("info", "The report is opened in a separate browser tab");

    }
}
