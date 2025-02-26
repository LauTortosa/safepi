import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export const useUserOptions = () => {
  const [positions, setPositions] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    
    Promise.all([
      api.get("/users/positions", { headers: { Authorization: `Bearer ${token}` } }),
      api.get("/users/roles", { headers: { Authorization: `Bearer ${token}` } })
    ])
    .then(([positionsResp, rolesResp]) => {
      setPositions(positionsResp.data);
      setRoles(rolesResp.data);
    })
    .catch((error) => {
      console.error("Error al cargar opciones del select", error);
    });
  }, []);

  return {positions, roles}
};

