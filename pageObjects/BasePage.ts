import { ClientFunction, Selector, t } from "testcafe";
import CutomLogger from "../log";
export default class BasePage {
    private spinnerImage = Selector(".spinner-image__double-bounce-inner");

    public async noPermission() {
        await t.expect(Selector("h2").withText("Sorry").exists).ok();
    }

    public async reloadPage() {
        await t.eval(() => location.reload(true));
        CutomLogger.logger.log("info", "Reload page");
    }

    public async goBack() {
        const goBack = ClientFunction(() => window.history.back());
        await goBack();
        CutomLogger.logger.log("info", "Go back");
    }

    public async isExistsSpinnerImage() {
        await t.expect(this.spinnerImage.exists).ok();
        CutomLogger.logger.log("info", "Spinner image exists");
    }
}
