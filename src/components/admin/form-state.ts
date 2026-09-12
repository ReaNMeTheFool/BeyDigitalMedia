/**
 * Admin formlarinin useActionState durumu. "use server" dosyalari tip
 * exportlayamadigi icin burada tanimlanir.
 */

export interface AdminFormState {
  status: "idle" | "ok" | "error";
  message: string;
  errors: Record<string, string[]>;
}

export const initialAdminFormState: AdminFormState = {
  status: "idle",
  message: "",
  errors: {},
};
