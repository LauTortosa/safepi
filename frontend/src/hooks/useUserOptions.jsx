import { useEffect, useState } from "react";
import { userPositionLabel, userRoleLabel } from "../utils/displayLabels";
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
      setPositions(positionsResp.data.map((pos) => ({ value: pos, label: userPositionLabel[pos] })));
      setRoles(rolesResp.data.map((role) => ({ value: role, label: userRoleLabel[role] })));
    })
    .catch((error) => {
      console.error("Error al cargar opciones del select", error);
    });
  }, []);

  return {positions, roles}
};

