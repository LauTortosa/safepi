import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axiosConfig";

import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import TableComponent from "../components/TableComponent";

const UsersListView = () => {
  const [users, setUsers] = useState([]);
  const [userRole] = useState();
  const navigate = useNavigate();

  // TODO filtrado users
  // TODO busqueda
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
        api
        .get("/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
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

    // TODO modal to confirm delete user
    const onDelete = (userId) => {
      const token = localStorage.getItem("authToken");

      if (token) {
        api
        .delete(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
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

  return (
    <div>
      <NavbarComponent />
      <div className="min-h-screen max-w-auto bg-gray-100 flex flex-col pt-16 ml-60">
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
            headers={["#", "Nombre", "Apellidos", "Fecha de nacimiento", "Puesto laboral", "Fecha de antigüedad", "Usuario", "Email", "Rol de usuario"]}
            rows={users.map((user,index) => [
              index + 1,
              user.name,
              user.last_name,
              user.birthday,
              user.position,
              user.start_date,
              user.username,
              user.email,
              user.role,
            ])}
            userRole={userRole}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersListView;
