import { ClientResponse } from "../domain/client_response.class";
import { generateToken, hashCredentials, verifyCredentials } from "../domain/crypto.service";
import type { RequestInfo } from "../domain/request_info.type";
import { getByKeyValue, post } from "../domain/resource.service";

export async function postRegister(requestInfo: RequestInfo): Promise<Response> {
  const existingUser = await getByKeyValue("users", "email", requestInfo.body.email);
  if (existingUser.length > 0) {
    return new ClientResponse("Invalid credentials", { status: 400 });
  }
  const hashedUser = await hashCredentials(requestInfo.body);
  const newUser = await post("users", hashedUser);
  if (!newUser.result) {
    return new ClientResponse(newUser.error, { status: 400 });
  }
  const user: any = { id: newUser.result.id, email: requestInfo.body.email };
  const accessToken = generateToken(user);
  const userToken = {
    user,
    accessToken,
  };
  return new ClientResponse(userToken);
}

export async function postLogin(requestInfo: RequestInfo): Promise<Response> {
  const usersIdentified = await getByKeyValue("users", "email", requestInfo.body.email);
  const userIdentified: any = usersIdentified[0];
  if (!userIdentified) {
    return new ClientResponse("Invalid credentials", { status: 404 });
  }
  const password = userIdentified.password;
  if (!(await verifyCredentials(requestInfo.body, password))) {
    return new ClientResponse("Invalid credentials", { status: 404 });
  }
  const user: any = { id: userIdentified.id, email: requestInfo.body.email };
  const accessToken = generateToken(user);
  const userToken = {
    user,
    accessToken: accessToken,
  };
  return new ClientResponse(userToken);
}
