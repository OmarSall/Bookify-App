import axios from "axios";
import { useAuth } from "@/services/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export function useAxios() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: "/api",
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error?.response?.status === 401) {
        await logout();
        navigate("/login", {
          replace: true,
          state: { msg: "Session expired. Please log in again." },
        });
      }
      return Promise.reject(error);
    },
  );

  return instance;
}
