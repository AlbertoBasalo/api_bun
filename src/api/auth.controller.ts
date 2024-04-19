import type { Credentials } from "../domain/credentials.type";
import { generateToken, hashCredentials, verifyCredentials } from "../domain/crypto.service";
import type { Item, NewItem } from "../domain/item.type";
import { logError, logWarning } from "../domain/log.service";
import { getByKeyValue, post } from "../domain/resource.service";
import type { Result } from "../domain/result.type";
import type { ClientRequest } from "../server/client_request.type";
import { ClientResponse } from "../server/client_response.class";

/**
 * Handles a POST request to register a new user
 * @param clientRequest The client request information
 * @returns {ClientResponse} The client response object with the user token
 * @throws {ClientResponse} If the request is invalid or unauthorized returns an error response
 */
export async function postRegister(clientRequest: ClientRequest): Promise<ClientResponse> {
  const credentials: Credentials = clientRequest.body as Credentials;
  if (!credentials) return new ClientResponse("Bad request", { status: 400 });
  const email = credentials.email;
  const existingUser = await getByKeyValue("users", "email", email);
  if (existingUser.length > 0) {
    logWarning("Registering a user that already exists", { email });
    return new ClientResponse("Invalid credentials", { status: 400 });
  }
  const hashedCredentials = await hashCredentials(credentials) as NewItem;
  const newUser = await post("users", hashedCredentials);
  const userCredentials = castToUserCredentials(newUser.data);
  if (!userCredentials.data) {
    return new ClientResponse(newUser.error, { status: 500 });
  }
  const userToken = buildUserToken(userCredentials.data);
  return new ClientResponse(userToken);
}

/**
 * Handles a POST request to login a user
 * @param clientRequest The client request information
 * @returns {ClientResponse} The client response object with the user token
 * @throws {ClientResponse} If the request is invalid or unauthorized returns an error response
 */
export async function postLogin(clientRequest: ClientRequest): Promise<ClientResponse> {
  const credentials: Credentials = clientRequest.body as Credentials;
  const email = credentials.email;
  if (!email) {
    return new ClientResponse("Email is required", { status: 400 });
  }
  const existingUsers = await getByKeyValue("users", "email", email);
  if (!existingUsers[0]) {
    return new ClientResponse("Invalid credentials", { status: 404 });
  }
  const existingUserResult: Result<Credentials & Item> = castToUserCredentials(existingUsers[0]);
  if (!existingUserResult.data) {
    logError(existingUserResult.error || 'Item malformed on db', { email });
    return new ClientResponse("Internal server error", { status: 500 });
  }
  const password: string = existingUserResult.data.password;
  if (!(await verifyCredentials(credentials, password))) {
    return new ClientResponse("Invalid credentials", { status: 404 });
  }
  const userToken = buildUserToken(existingUserResult.data);
  return new ClientResponse(userToken);
}

/**
 * Cast between Item and Credentials
 * @param user The user at the data base
 * @returns An onject with the user and credentials properties
 * @throws {Result} If the item is malformed returns an error
 */
function castToUserCredentials(user?: Item): Result<Credentials & Item> {
  if (!user) {
    const error = "User not found";
    return { error };
  }
  const data = user as Credentials & Item;
  if (!data.id || !data.email || !data.password) {
    const error = "Item malformed";
    return { error };
  }
  return { data };
}

/**
 * Builds a user token with the user id and email and an access token
 * @param existingUser The existing user
 * @returns The user token
 */
function buildUserToken(existingUser: Credentials & Item): UserToken {
  const id = existingUser.id;
  const email = existingUser.email;
  const user: { id: string, email: string } = { id, email };
  const accessToken = generateToken(id);
  const userToken = {
    user,
    accessToken,
  };
  return userToken;
}
/**
 * The user token sent to the client
 * Includes the user id and email and the access token
 */
type UserToken = {
  user: { id: string; email: string };
  accessToken: string;
};
