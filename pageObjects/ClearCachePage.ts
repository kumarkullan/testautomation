import { Selector, t } from "testcafe";
import CutomLogger from "../log";

import { DocketingPortalApiUrls } from "../testData/urls";
import BasePage from "./BasePage";

export default class ClearCachePage extends BasePage {
    private ClearCachButtom = Selector(".header-bar__clear-cache-button").find("span").withText("Clear cache");
    private ClearForEveryone = Selector("th").withText("Clear for everyone").find("button");

    public async ClearCache() {
        await t
            .click(this.ClearCachButtom)
            .setNativeDialogHandler(() => true)
            .click(this.ClearForEveryone);

        await t.navigateTo(DocketingPortalApiUrls.LoginUrl);
        CutomLogger.logger.log("info", "Cache was cleared");
    }
}
