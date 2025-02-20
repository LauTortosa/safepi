import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  last_name: string;
  username?: string;
  email?: string;
  birthday?: string;
  start_date?: string;
  position?: string;
  age?: number;
}

export const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener el usuario", error);
      });
  }, []);

  return user;
};
