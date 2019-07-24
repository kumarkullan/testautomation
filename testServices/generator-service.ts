export default class GeneratorService {

    public GenerateUserName(): string {
        return "test" + (new Date()).getTime() + "@test.com";
    }

    public GenerateContentGroupName(): string {
        return "test" + (new Date()).getTime();
    }
}
