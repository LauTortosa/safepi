import { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const UsersListView = () => {
  const [users, setUsers] = useState([]);
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
              { path: "/usersList", label: "📋 Lista de usuarios"},
              { path: "/create-user", label: "➕ Crear nuevo usuario"},
            ]}
          />
          <main className="flex-1 flex justify-center px-6">
            <div className="bg-white shadow-lg rounded-lg p-8 mb-10">
              <div className="overflow-x-auto">
                 {/* TODO orden ascendente/descendente */}
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th className="p-2 border">#</th>
                      <th className="p-2 border">Nombre</th>
                      <th className="p-2 border">Apellidos</th>
                      <th className="p-2 border">Fecha de nacimiento</th>
                      <th className="p-2 border">Puesto</th>
                      <th className="p-2 border">Fecha de antigüedad</th>
                      <th className="p-2 border">Usuario</th>
                      <th className="p-2 border">Email</th>
                      <th className="p-2 border">Rol</th>
                      <th className="p-2 border">Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user.id} className="hover:bg-gray-200">
                          <td className="p-2 border">{index + 1}</td>
                          <td className="p-2 border">{user.name}</td>
                          <td className="p-2 border">{user.last_name}</td>
                          <td className="p-2 border">{user.birthday}</td>
                          <td className="p-2 border">{user.position}</td>
                          <td className="p-2 border">{user.start_date}</td>
                          <td className="p-2 border">{user.username}</td>
                          <td className="p-2 border">{user.email}</td>
                          <td className="p-2 border">{user.role}</td>
                          <td className="p-2 border">
                            <span onClick={() => onDelete(user.id)}
                            className="cursor-pointer"
                            >
                              🗑️
                            </span>
                            <span onClick={() => onUpdate(user.id)}
                              className="cursor-pointer"
                            >
                              ✏️
                            </span>  
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center p-4">
                          No hay usuarios disponibles.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UsersListView;
