import { ClientResponse } from "../domain/client_response.class";
import type { RequestInfo } from "../domain/request_info.type";

export async function postRegister(requestInfo: RequestInfo): Promise<Response> {
  const user = requestInfo.body;
  // insert user into database
  delete user.password;
  const userToken = {
    user,
    accessToken: "json.web.token",
  };
  return new ClientResponse(userToken);
}

export async function postLogin(requestInfo: RequestInfo): Promise<Response> {
  const user = requestInfo.body;
  // check user credentials
  delete user.password;
  const userToken = {
    user,
    accessToken: "json.web.token",
  };
  return new ClientResponse(userToken);
}
