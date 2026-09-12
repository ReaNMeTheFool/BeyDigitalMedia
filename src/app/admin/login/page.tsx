import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, isValidSession } from "@/lib/admin-auth";
import { loginAction } from "@/app/admin/login/actions";
import { adminInputClass, adminPrimaryButtonClass } from "@/components/admin/styles";

export const metadata = { title: "Giriş" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (token && (await isValidSession(token))) {
    redirect("/admin");
  }

  const params = await searchParams;
  const hasError = params.error != null;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="text-lg font-semibold">Yönetim Paneli</h1>
        <p className="mb-5 mt-1 text-sm text-neutral-500">Devam etmek için giriş yapın.</p>
        {hasError && (
          <p className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Kullanıcı adı veya şifre hatalı.
          </p>
        )}
        <form action={loginAction} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-500">
              Kullanıcı Adı
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className={adminInputClass}
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-500">
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className={adminInputClass}
            />
          </div>
          <button type="submit" className={`${adminPrimaryButtonClass} w-full`}>
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
