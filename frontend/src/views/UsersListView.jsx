import { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import api from "../api/axiosConfig";

const UsersListView = () => {
  const [users, setUsers] = useState([]);

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
    

  return (
    <div>
      <NavbarComponent />
      <div className="min-h-screen max-w-auto bg-gray-100 flex flex-col pt-16">
        <h1 className="text-3xl font-semibold text-center mb-6 pt-16 text-blue-900 w-full">
          LISTA DE USUARIOS
        </h1>

        <div className="flex ">
          <SidebarComponent />
          <main className="flex-1 flex justify-center px-6">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <div className="overflow-x-auto">
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
