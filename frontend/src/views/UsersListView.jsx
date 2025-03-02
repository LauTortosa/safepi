import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRoleLabel, userPositionLabel } from "../utils/displayLabels";
import { useAuthUser } from "../hooks/useAuthUser";

import api from "../api/axiosConfig";

import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import TableComponent from "../components/TableComponent";
import ModalComponent from "../components/ModalComponent";

const UsersListView = () => {
  const [users, setUsers] = useState([]);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const { token, userRole }= useAuthUser();
  const navigate = useNavigate();

  // TODO filtrado users
  // TODO busqueda
  useEffect(() => {
    if (token) {
        api
        .get("/users", { headers: { Authorization: `Bearer ${token}` }
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
        api.delete(`/users/${userId}`, { headers: { Authorization: `Bearer ${token}` }
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
    <div>
      <NavbarComponent />
      <div className="min-h-screen max-w-auto bg-gray-100 flex flex-col pt-16">
        <h1 className="text-3xl font-semibold text-center mb-6 pt-16 text-blue-900 w-full">
          LISTA DE USUARIOS
        </h1>

        <div className="flex ">
          <SidebarComponent 
            options={[
              { path: "/list-users", label: "📋 Lista de usuarios"},
              { path: "/create-user", label: "➕ Crear nuevo usuario"},
            ]}
          />
          <TableComponent
            headers={["#", "Id", "Nombre", "Apellidos", "Fecha de nacimiento", "Puesto laboral", "Fecha de antigüedad", "Usuario", "Email", "Rol de usuario"]}
            rows={rows}
            userRole={userRole}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </div>
        <ModalComponent
          isOpen={isUserDeleted}
          title="Usuario eliminado!"
          content={"El usuario ha sido eliminado correctamente."}
          onClose={() => setIsUserDeleted(false)}
        />
      </div>
    </div>
  );
};

export default UsersListView;
