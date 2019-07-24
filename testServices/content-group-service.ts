import Axios from "axios";

import { AuthorizationData } from "../testData/default-data";
import { UserManagementApiUrls } from "../testData/urls";

import ContentGroupModel from "../testModels/content-groups-model";

export default class ContentGroupsService {
  private authorizationDataBase64 = Buffer.from(AuthorizationData.UserName + ":" + AuthorizationData.UserPassword).toString("base64");

  public async IsContentGroupNameInUse(contentGroupName: string, clientCode: string): Promise<boolean> {
    try {
      return (await Axios.get(
        UserManagementApiUrls.ContentGroupsServiceUrls.IsContentGroupNameInUseUrl + "?contentGroupName=" + contentGroupName + "&clientCode=" + clientCode,
        {
          headers: {
            "Accept": "application/json, text/plain, */*",
            "Authorization": "Basic " + this.authorizationDataBase64,
            "Content-type": "application/json;charset=UTF-8",
          },
        })).data;
    } catch (err) {
      console.log(err.response.data.Message);
      throw err;
    }
  }

  public async SaveContentGroup(contentGroup: ContentGroupModel, userName: string, clientCode: string): Promise<ContentGroupModel> {
    try {
      return (await Axios.post<ContentGroupModel>(
        UserManagementApiUrls.ContentGroupsServiceUrls.SaveContentGroupUrl + "?userName=" + userName + "&clientCode=" + clientCode,
        JSON.stringify(contentGroup),
        {
          headers: {
            "Accept": "application/json, text/plain, */*",
            "Authorization": "Basic " + this.authorizationDataBase64,
            "Content-type": "application/json;charset=UTF-8",
          },
        })).data;
    } catch (err) {
      console.log(err.response.data.Message);
      throw err;
    }
  }

  public async DeleteContentGroup(contentGroupId: number, description: string, userName: string, clientCode: string): Promise<string> {
    try {
      return (await Axios.delete(
        UserManagementApiUrls.ContentGroupsServiceUrls.DeleteContentGroupUrl + "?contentGroupId=" + contentGroupId + "&userName=" + userName + "&clientCode=" + clientCode + "&description=" + description,
        {
          headers: {
            "Accept": "application/json, text/plain, */*",
            "Authorization": "Basic " + this.authorizationDataBase64,
            "Content-type": "application/json;charset=UTF-8",
          },
        })).data;
    } catch (err) {
      console.log(err.response.data.Message);
      throw err;
    }
  }
}
