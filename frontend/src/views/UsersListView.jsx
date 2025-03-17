import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRoleLabel, userPositionLabel } from "../utils/displayLabels";
import { useAuthUser } from "../hooks/useAuthUser";

import api from "../api/axiosConfig";

import TableComponent from "../components/TableComponent";
import ModalComponent from "../components/ModalComponent";
import ContentBoxComponent from "../components/ContentBoxComponent";

const UsersListView = () => {
  const [users, setUsers] = useState([]);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const { token, userRole } = useAuthUser();
  const navigate = useNavigate();

  // TODO filtrado users
  // TODO busqueda
  useEffect(() => {
    if (token) {
      api
        .get("/users", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de usuarios", error);
        });
    } else {
      console.error("Token no encontrado");
    }
  }, []);

  const onDelete = (userId) => {
    if (token) {
      api.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
          setIsUserDeleted(true);
        })
        .catch((error) => {
          console.error("Error al eliminar el usuario", error);
        });
    } else {
      console.error("Token no encontrado");
    }
  };

  const onUpdate = (userId) => {
    navigate(`/update-user/${userId}`);
  };

  const rows = users.map((user, index) => [
    index + 1,
    user.id,
    user.name,
    user.last_name,
    user.birthday,
    userPositionLabel[user.position] || user.position,
    user.start_date,
    user.username,
    user.email,
    userRoleLabel[user.role] || user.role,
  ]);

  return (
    <ContentBoxComponent
      title={"LISTA DE USUARIOS"}
      userRole={userRole}
      sidebarOptions={[
        { path: "/list-users", label: "📋 Lista de usuarios" },
        { path: "/create-user", label: "➕ Crear nuevo usuario" },
      ]}
    >
      
      <TableComponent
        headers={["#", "Id", "Nombre", "Apellidos", "Fecha de nacimiento", "Puesto laboral", "Fecha de antigüedad", "Usuario", "Email", "Rol de usuario"]}
        rows={rows}
        userRole={userRole}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
      <ModalComponent
        isOpen={isUserDeleted}
        title="Usuario eliminado!"
        content={"El usuario ha sido eliminado correctamente."}
        onClose={() => setIsUserDeleted(false)}
      />
    </ContentBoxComponent>
  );
};

export default UsersListView;
