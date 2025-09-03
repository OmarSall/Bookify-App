import { http } from "@/lib/http";

// Delete currently logged-in user
export async function deleteSelf(): Promise<void> {
  try {
    const res = await http.delete("/users");
    if (res.status === 200 || res.status === 204) {
      return;
    }
    throw new Error("Unexpected response while deleting account.");
  } catch (err: any) {
    const message =
      err?.response?.data?.message ?? err.message ?? "Failed to delete account.";
    throw new Error(message);
  }
}
