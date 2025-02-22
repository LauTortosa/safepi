import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export const useUserOptions = () => {
  const [positions, setPositions] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    
    api
      .get("/users/positions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPositions(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar opciones del select position", error);
      });
    
      api
        .get("/users/roles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setRoles(response.data);
        })
        .catch((error) => {
          console.error("Error al cargar opciones del select role", error);
        });
  }, []);

  return {positions, roles}
};

