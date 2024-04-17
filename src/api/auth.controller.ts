import { ClientResponse } from "../domain/client_response.class";
import { generateToken, hashCredentials, verifyCredentials } from "../domain/crypto.service";
import { getByKeyValue, post } from "../domain/resource.service";
import type { ClientRequest } from "../domain/client_request.type";
import type { Credentials } from "../domain/credentials.type";
import type { NewItem } from "../domain/item.type";

export async function postRegister(clientRequest: ClientRequest): Promise<Response> {
  const credentials: Credentials = clientRequest.body as Credentials;
  const email = credentials.email;
  if (!email) {
    return new ClientResponse("Email is required", { status: 400 });
  }
  const existingUser = await getByKeyValue("users", "email", email);
  if (existingUser.length > 0) {
    return new ClientResponse("Invalid credentials", { status: 400 });
  }
  const hashedUser = await hashCredentials(credentials) as NewItem;
  const newUser = await post("users", hashedUser);
  if (!newUser.result) {
    return new ClientResponse(newUser.error, { status: 400 });
  }
  return generateTokenResponse(newUser.result);
}

export async function postLogin(clientRequest: ClientRequest): Promise<Response> {
  const credentials: Credentials = clientRequest.body as Credentials;
  const email = credentials.email;
  if (!email) {
    return new ClientResponse("Email is required", { status: 400 });
  }
  const existingUsers = await getByKeyValue("users", "email", email);
  const existingUser: any = existingUsers[0];
  if (!existingUser) {
    return new ClientResponse("Invalid credentials", { status: 404 });
  }
  const password = existingUser.password;
  if (!(await verifyCredentials(credentials, password))) {
    return new ClientResponse("Invalid credentials", { status: 404 });
  }
  return generateTokenResponse(existingUser);
}

function generateTokenResponse(existingUser: any): Response {
  const id = existingUser.id;
  const email = existingUser.email;
  const user: any = { id, email };
  const accessToken = generateToken(user);
  const userToken = {
    user,
    accessToken,
  };
  return new ClientResponse(userToken);
}
