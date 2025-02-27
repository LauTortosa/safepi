import { useEffect } from "react";
import api from "../api/axiosConfig";

export const useUserOptions = () => {
  const positions = [
    { value: "LABORER", label: "Peón" },
    { value: "OPERATOR", label: "Operario/a" },
    { value: "SUPERVISOR", label: "Oficial" },
    { value: "QUALITY_TECHNICIAN", label: "Técnico/a de Calidad" },
    { value: "MAINTENANCE_TECHNICIAN", label: "Técnico/a de Mantenimiento" },
    { value: "CLEANER", label: "Limpiador/a" },
  ];

  const roles = [
    { value: "USER", label: "Usuario" },
    { value: "ADMIN", label: "Admin" },
  ];

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

