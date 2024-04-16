import { ClientResponse } from "../domain/client_response.class";
import { generateToken, hashCredentials, verifyCredentials } from "../domain/crypto.service";
import { getByKeyValue, post } from "../domain/resource.service";
import type { RequestInfo } from "./request_info.type";

export async function postRegister(requestInfo: RequestInfo): Promise<Response> {
  const email = (requestInfo.body as any)?.email;
  if (!email) {
    return new ClientResponse("Email is required", { status: 400 });
  }
  const existingUser = await getByKeyValue("users", "email", email);
  if (existingUser.length > 0) {
    return new ClientResponse("Invalid credentials", { status: 400 });
  }
  const hashedUser = await hashCredentials(requestInfo.body);
  const newUser = await post("users", hashedUser);
  if (!newUser.result) {
    return new ClientResponse(newUser.error, { status: 400 });
  }
  const id = newUser.result.id;
  const user: any = { id, email };
  const accessToken = generateToken(user);
  const userToken = {
    user,
    accessToken,
  };
  return new ClientResponse(userToken);
}

export async function postLogin(requestInfo: RequestInfo): Promise<Response> {
  const email = (requestInfo.body as any)?.email;
  if (!email) {
    return new ClientResponse("Email is required", { status: 400 });
  }
  const usersIdentified = await getByKeyValue("users", "email", email);
  const userIdentified: any = usersIdentified[0];
  if (!userIdentified) {
    return new ClientResponse("Invalid credentials", { status: 404 });
  }
  const password = userIdentified.password;
  if (!(await verifyCredentials(requestInfo.body, password))) {
    return new ClientResponse("Invalid credentials", { status: 404 });
  }
  const id = userIdentified.id;
  const user: any = { id, email };
  const accessToken = generateToken(user);
  const userToken = {
    user,
    accessToken,
  };
  return new ClientResponse(userToken);
}
