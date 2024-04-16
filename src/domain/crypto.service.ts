import crypto from "crypto";
import { API_BUN_CONFIG } from "../api_bun.config";
import type { Result } from "./result.type";
const secret = API_BUN_CONFIG.SECRET;

export async function hashCredentials(credentials: any): Promise<any> {
  const password = await Bun.password.hash(credentials.password);
  return { ...credentials, password };
}

export async function verifyCredentials(credentials: any, hash: string): Promise<boolean> {
  return await Bun.password.verify(credentials.password, hash);
}

export function generateToken(user: any): string {
  const payload = user.id;
  const sign = crypto.createHmac("sha256", secret).update(payload).digest("base64");
  return `${payload}.${sign}`;
}

export function verifyToken(token: string): Result<string> {
  const [payload, sign] = token.split(".");
  const payloadSign = crypto.createHmac("sha256", secret).update(payload).digest("base64");
  if (sign !== payloadSign) {
    return { error: "Invalid token" };
  }
  return { result: payload };
}

export function generateUUID(): string {
  return crypto.randomUUID({});
}
