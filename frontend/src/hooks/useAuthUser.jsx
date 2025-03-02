import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export const useAuthUser = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
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
        localStorage.setItem("userRole", response.data.role);
        localStorage.setItem("userId", response.data.id);
      })
      .catch((error) => {
        console.error("Error al obtener el usuario", error);
      })
     
  }, [token, navigate]);

  return { 
    user,
    userRole: user?.role || localStorage.getItem("userRole"),
    userId: user?.id || localStorage.getItem("userId"),
    token,
  };
};

