import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRoleLabel, userPositionLabel } from "../../utils/displayLabels";
import { useAuthUser, useGeneratePdf } from "../../hooks";
import api from "../../api/axiosConfig";
import { TableComponent, ModalComponent, ContentBoxComponent } from "../../components"
import { headers } from "next/headers";

const UsersListView = () => {
  const [users, setUsers] = useState([]);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const { token, userRole } = useAuthUser();
  const navigate = useNavigate();
  const { generatePDF } = useGeneratePdf();

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

  const headers = ["#", "Id", "Nombre", "Apellidos", "Fecha de nacimiento", "Puesto laboral", "Fecha de antigüedad", "Usuario", "Email", "Rol de usuario"];

  const onGeneratePDF = () => {
    const fileName = "userList.pdf";

    generatePDF(fileName, [
      {
        title: "Lista de usuarios",
        headers: headers,
        rows: rows
      }
    ]);
  };

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
        headers={headers}
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
      <button
        onClick={onGeneratePDF}
        className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        📄 Generar PDF
      </button>
    </ContentBoxComponent>
  );
};

export default UsersListView;
