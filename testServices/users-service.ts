import Axios from "axios";

import { AuthorizationData } from "../testData/default-data";
import { UserManagementApiUrls } from "../testData/urls";

import UserModel from "../testModels/user-model";

export default class UsersService {
  private authorizationDataBase64 = Buffer.from(AuthorizationData.UserName + ":" + AuthorizationData.UserPassword).toString("base64");

  public async SaveUser(user: UserModel): Promise<UserModel> {
    try {
      return (await Axios.post<UserModel>(
        UserManagementApiUrls.UsersServiceUrls.SaveUserUrl,
        JSON.stringify(user),
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

  public async DeleteUser(userId: number): Promise<string> {
    try {
      return (await Axios.delete(
        UserManagementApiUrls.UsersServiceUrls.DeleteUserUrl + "?userId=" + userId,
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
