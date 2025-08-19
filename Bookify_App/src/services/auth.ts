import { http } from '../lib/http';
import { ENDPOINTS } from '../constants/api';

export type AuthUser = { id: number; email: string; name: string };

export async function signup(payload: { email: string; name: string; password: string }) {
  const { data } = await http.post<AuthUser>(ENDPOINTS.AUTH.SIGNUP, payload);
  return data;
}
export async function login(payload: { email: string; password: string }) {
  const { data } = await http.post<AuthUser>(ENDPOINTS.AUTH.LOGIN, payload);
  return data;
}
export async function logout() {
  await http.post(ENDPOINTS.AUTH.LOGOUT);
}
export async function me() {
  const { data } = await http.get<AuthUser>(ENDPOINTS.AUTH.ME);
  return data;
}
