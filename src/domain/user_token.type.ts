/**
 * The user token sent to the client
 * Includes the user id and email and the access token
 */
export type UserToken = {
  user: { id: string; email: string };
  accessToken: string;
};
