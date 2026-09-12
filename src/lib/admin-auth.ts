import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Mini admin kimlik dogrulama. PBKDF2 + HMAC-SHA256 yalnizca WebCrypto ile;
 * harici auth bagimliligi yok. Yerel degiskenler .dev.vars, canlilar
 * wrangler vars uzerinden Cloudflare env'inde yasar; process.env ikincil
 * kaynaktir (workerd nodejs_compat).
 */

export const COOKIE_NAME = "bdm_admin";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const PBKDF2_ITERATIONS = 100_000;

const encoder = new TextEncoder();

function getEnvVar(name: string): string | undefined {
  try {
    const fromContext = (getCloudflareContext().env as unknown as Record<string, unknown>)[name];
    if (typeof fromContext === "string" && fromContext.length > 0) return fromContext;
  } catch {
    // Cloudflare context yoksa process.env'den okunur (tsx testleri vb.)
  }
  return process.env[name];
}

function toBase64Url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return diff === 0;
}

async function pbkdf2Hash(password: string, salt: Uint8Array<ArrayBuffer>): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: PBKDF2_ITERATIONS },
    keyMaterial,
    256,
  );
  return new Uint8Array(bits);
}

async function hmacSign(payload: string): Promise<Uint8Array> {
  const secret = getEnvVar("AUTH_SECRET");
  if (!secret) throw new Error("AUTH_SECRET tanimli degil");
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return new Uint8Array(signature);
}

/** Kullanici adi + sifreyi env degerleriyle zamanlamaya dayanikli karsilastirir. */
export async function verifyAdminLogin(username: string, password: string): Promise<boolean> {
  const expectedUser = getEnvVar("ADMIN_USERNAME");
  const expectedPassword = getEnvVar("ADMIN_PASSWORD");
  if (!expectedUser || !expectedPassword) return false;
  // ADMIN_PASSWORD env'de duz metindir; karmasi request basina bellekte uretilir.
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const expectedHash = await pbkdf2Hash(expectedPassword, salt);
  const candidateHash = await pbkdf2Hash(password, salt);
  const userOk = timingSafeEqual(encoder.encode(username), encoder.encode(expectedUser));
  const passwordOk = timingSafeEqual(candidateHash, expectedHash);
  return userOk && passwordOk;
}

/** 32 bayt rastgele token + 7 gun exp + HMAC-SHA256 imzasi. */
export async function createSessionToken(): Promise<string> {
  const raw = crypto.getRandomValues(new Uint8Array(32));
  const id = toBase64Url(raw);
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `${id}.${exp}`;
  const signature = toBase64Url(await hmacSign(payload));
  return `${payload}.${signature}`;
}

export async function isValidSession(token: string | null | undefined): Promise<boolean> {
  if (!token || !getEnvVar("AUTH_SECRET")) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [id, expRaw, signatureRaw] = parts;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp <= Date.now()) return false;
  try {
    const expected = await hmacSign(`${id}.${expRaw}`);
    return timingSafeEqual(expected, base64UrlDecode(signatureRaw));
  } catch {
    return false;
  }
}

/** Oturum gecersizse /admin/login'e yonlendirir. */
export async function requireAdmin(): Promise<void> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token || !(await isValidSession(token))) {
    redirect("/admin/login");
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearSessionCookie(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}
