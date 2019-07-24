import { Selector, t } from "testcafe";
import CutomLogger from "../log";
import BaseQueryPage from "./BaseQueryPage";

export default class PartyPage extends BaseQueryPage {

    public async validatePartyList() {
        await t.expect(Selector(".ca-tree-view__item").find("span").withText("Party").exists).ok();
    }

    public async isNotExistsPartyQuery(partyQueryName: string) {
        await t.expect(Selector(".ca-tree-view__item").find("span").withText(partyQueryName).exists).notOk();
        await CutomLogger.logger.log("info", "The Party Query '" + partyQueryName + "' not exists in Party list");
    }

    public async isExistsPartyQuery(partyQueryName: string) {
        await t.expect(Selector(".ca-tree-view__item").find("span").withText(partyQueryName).exists).ok();
        await CutomLogger.logger.log("info", "The Party Query '" + partyQueryName + "' exists in Party list");
    }

    public async checkOrderQueriesFromList() {
        await t.expect(Selector(".ca-tree-view__item").nth(1).find("span").withText("Automation Party query"));
        await t.expect(Selector(".ca-tree-view__item").nth(2).find("span").withText("Party Query"));
        await CutomLogger.logger.log("info", "Queries are arranged in order");
    }
}
