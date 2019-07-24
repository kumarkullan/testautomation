import ContentGroupModel from "../testModels/content-groups-model";

export default class ContentGroupsFactory {
    public static AddPermissionsListToContentGroup(contentGroup: ContentGroupModel, ...permissionsList: any[]) {
        permissionsList.forEach((permissions) => {
            contentGroup.PermissionsList.push(...permissions);
        });
    }

    public static AddApplicationSecuritySourceToContentGroup(contentGroup: ContentGroupModel, ...applicationSecuritySourceList: any[]) {
        applicationSecuritySourceList.forEach((applicationSecuritySource) => {
            contentGroup.ApplicationSecuritySource.push(applicationSecuritySource);
        });
    }

    public static SetStatusForConetentGroup(contentGroup: ContentGroupModel, status: number) {
        contentGroup.Status = status;
    }
}
