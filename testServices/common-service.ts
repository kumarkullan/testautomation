import ContentGroupsService from "./content-group-service";
import GeneratorService from "./generator-service";
import UsersService from "./users-service";

import ContentGroupModel from "../testModels/content-groups-model";
import UserModel from "../testModels/user-model";

import * as DefaultValues from "../testData/default-data";

export default class CommonService {
    private User: UserModel;
    private ContentGroupList: ContentGroupModel[] = [];

    private generatorService = new GeneratorService();
    private usersService = new UsersService();
    private contentGroupsService = new ContentGroupsService();

    public async SaveUserAndContentGroup(defaultUser: UserModel, defaultContentGroup: ContentGroupModel): Promise<string> {
        await this.SaveUser(defaultUser);
        await this.SaveContentGroup(defaultContentGroup);

        return this.User.UserName;
    }

    public async DeleteUserAndContentGroups() {
        await this.DeleteUser();
        await this.DeleteContentGroups();
    }

    public async SaveUser(defaultUser: UserModel): Promise<string> {
        try {
            defaultUser.UserName = this.generatorService.GenerateUserName();
            this.User = await this.usersService.SaveUser(defaultUser);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.Message === "User name already exists.") {
                await this.SaveUser(defaultUser);
                return;
            }

            throw err;
        }

        if (!this.User) {
            throw new Error("Couldn't create User.");
        }

        console.log("User was created: " + this.User.UserId + " - " + this.User.UserName);

        return this.User.UserName;
    }

    public async DeleteUser() {
        if (this.User) {
            let result = await this.usersService.DeleteUser(this.User.UserId);
            console.log(result);
        }
    }

    public async SaveContentGroup(defaultContentGroup: ContentGroupModel): Promise<number> {
        do {
            defaultContentGroup.ContentGroupName = this.generatorService.GenerateContentGroupName();
        } while (await this.contentGroupsService.IsContentGroupNameInUse(
            defaultContentGroup.ContentGroupName,
            DefaultValues.DefaultParametersForContentGroup.ClientCode));

        if (!this.User) {
            throw new Error("Couldn't create Content Group because User wasn't created.");
        }

        defaultContentGroup.UserContentGroupPool[0].Name = this.User.UserName;

        let contentGroup = await this.contentGroupsService.SaveContentGroup(
            defaultContentGroup,
            DefaultValues.DefaultParametersForContentGroup.UserName,
            DefaultValues.DefaultParametersForContentGroup.ClientCode);

        if (!contentGroup) {
            throw new Error("Couldn't create Content Group.");
        }

        console.log("Content group was created: " + contentGroup.ContentGroupId + " - " + contentGroup.ContentGroupName);
        this.ContentGroupList.push(contentGroup);
        return contentGroup.ContentGroupId;
    }

    public async DeleteContentGroups() {
        if (this.ContentGroupList) {
            let i = 0;
            let length = this.ContentGroupList.length;
            for (i = 0; i < length; i++) {
                let result = await this.contentGroupsService.DeleteContentGroup(
                    this.ContentGroupList[i].ContentGroupId,
                    DefaultValues.DefaultParametersForContentGroup.Description,
                    DefaultValues.DefaultParametersForContentGroup.UserName,
                    DefaultValues.DefaultParametersForContentGroup.ClientCode);
                console.log(result);
            }
            this.ContentGroupList = [];
        }
    }

    public async DeleteContentGroupById(contentGroupId: number) {
        if (this.ContentGroupList.find((contentGroup) => contentGroup.ContentGroupId === contentGroupId)) {
            let result = await this.contentGroupsService.DeleteContentGroup(
                contentGroupId,
                DefaultValues.DefaultParametersForContentGroup.Description,
                DefaultValues.DefaultParametersForContentGroup.UserName,
                DefaultValues.DefaultParametersForContentGroup.ClientCode);
            console.log(result);
        } else {
            console.log("Content group wasn't deleted because not found with ID = " + contentGroupId);
        }
    }

    public async ChangePermissionsOfContentGroup(contentGroupId: number, permissions: Array<{Id: number, ParentCategoryId: number}>) {
        let contentGroup = this.ContentGroupList.find((contentGroup) => contentGroup.ContentGroupId === contentGroupId);

        if (contentGroup) {
            contentGroup.PermissionsList = permissions;
            contentGroup.UserContentGroupPool[0].ContentGroupId = contentGroupId;

            this.ContentGroupList[this.ContentGroupList.findIndex((contentGroup) => contentGroup.ContentGroupId === contentGroupId)] = contentGroup;

            contentGroup = await this.contentGroupsService.SaveContentGroup(
                contentGroup,
                DefaultValues.DefaultParametersForContentGroup.UserName,
                DefaultValues.DefaultParametersForContentGroup.ClientCode);

            if (!contentGroup) {
                throw new Error("Couldn't change permissions to Content Group with ID " + contentGroupId);
            }

            console.log("Permissions was changed to Content Group with ID: " + contentGroup.ContentGroupId);
        }
    }

    public async ChangeStatusOfContentGroup(contentGroupId: number, status: number) {
        let contentGroup = this.ContentGroupList.find((contentGroup) => contentGroup.ContentGroupId === contentGroupId);

        if (contentGroup) {
            contentGroup.Status = status;
            contentGroup.UserContentGroupPool[0].ContentGroupId = contentGroupId;

            this.ContentGroupList[this.ContentGroupList.findIndex((contentGroup) => contentGroup.ContentGroupId === contentGroupId)] = contentGroup;

            contentGroup = await this.contentGroupsService.SaveContentGroup(
                contentGroup,
                DefaultValues.DefaultParametersForContentGroup.UserName,
                DefaultValues.DefaultParametersForContentGroup.ClientCode);

            if (!contentGroup) {
                throw new Error("Couldn't change status to Content Group with ID " + contentGroupId);
            }

            console.log("Status was changed to Content Group with ID: " + contentGroup.ContentGroupId);
        }
    }
}
