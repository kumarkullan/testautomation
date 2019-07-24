import { ClientFunction, Selector, t } from "testcafe";
import CutomLogger from "../log";

import { DocketingPortalApiUrls } from "../testData/urls";
import BasePage from "./BasePage";

export default class WeblinksPage extends BasePage {
    public async SelectWebLinksFromDrpDown(webLink: string, urlWebLink: string) {
        let weblinkClick = await Selector(".ca-flyout-menu__item");
        let weblinkSelect = await weblinkClick.find("span");
        await t.click(weblinkSelect.withText(webLink));
        const getLocation = ClientFunction(() => document.location.href);
        await t.expect(getLocation()).contains(urlWebLink);
        await t.navigateTo(DocketingPortalApiUrls.LoginUrl);
        CutomLogger.logger.log("info", "URL of " + webLink + " is opened in a separate browser tab");
    }

    public async CheckOrderWebLinksFromDrpDown() {
        await t.takeScreenshot("WebLinks.png")
               .expect(Selector(".k-popup").find("div").nth(1).textContent).eql("2weblink [do not change]")
               .expect(Selector(".k-popup").find("div").nth(2).textContent).eql("aweblink [do not change]")
               .expect(Selector(".k-popup").find("div").nth(3).textContent).eql("bweblink [do not change]")
               .expect(Selector(".k-popup").find("div").nth(4).textContent).eql("weblink1 [do not change]");
        CutomLogger.logger.log("info", "Web links are arranged in order");
    }
}
