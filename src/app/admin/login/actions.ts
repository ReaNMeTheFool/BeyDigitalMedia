"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  COOKIE_NAME,
  clearSessionCookie,
  createSessionToken,
  isValidSession,
  setSessionCookie,
  verifyAdminLogin,
} from "@/lib/admin-auth";

export async function loginAction(formData: FormData): Promise<void> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const ok = await verifyAdminLogin(username, password);
  if (!ok) {
    redirect("/admin/login?error=1");
  }

  await setSessionCookie(await createSessionToken());
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (token && (await isValidSession(token))) {
    await clearSessionCookie();
  }
  redirect("/admin/login");
}
