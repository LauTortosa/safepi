import { useEffect, useState } from "react";

import InputComponent from "../components/InputComponent";
import SelectComponent from "../components/SelectComponent";
import ModalComponent from "../components/ModalComponent";
import ContentBoxComponent from "../components/ContentBoxComponent";

import api from "../api/axiosConfig";

import { useUserOptions } from "../hooks/useUserOptions";
import { useUserFormReducer } from "../hooks/useUserFormReducer";
import { useUserFormValidate } from "../hooks/useUserFormValidate";
import { useAuthUser } from "../hooks/useAuthUser";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUserView = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const [formData, dispatch] = useUserFormReducer();
  const { positions, roles } = useUserOptions();
  const { token } = useAuthUser();

  const formFields = [
    { label: "Nombre", type: "text", name: "name", placeholder: "Nombre", minLength: 3, maxLength: 25 },
    { label: "Apellidos", type: "text", name: "last_name", placeholder: "Apellidos", minLength: 3 },
    { label: "Fecha de nacimiento", type: "date", name: "birthday" },
    { label: "Fecha de antigüedad laboral", type: "date", name: "start_date" },
    { label: "Posición laboral", type: "select", name: "position", options: positions },
    { label: "Nombre de usuario", type: "text", name: "username", placeholder: "Nombre de usuario", minLength: 3, maxLength: 20 },
    { label: "Email", type: "email", name: "email", placeholder: "Email" },
    { label: "Contraseña", type: "password", name: "password", placeholder: "Password", minLength: 3, maxLength: 30 },
    { label: "Rol de usuario", type: "select", name: "role", options: roles },
  ];

  const { errors, setErrors, validateForm } = useUserFormValidate(formFields);

  useEffect(() => {
    if (token) {
      api.get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
          dispatch({ type: "SET_FORM", payload: response.data });
        })
        .catch((error) => {
          console.error("Error al obtener datos del usuario", error);
        });
    } else {
      console.error("Error al obtener el token");
    };
  }, [userId]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm(formData)) return;

    api.put(`/users/${userId}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setIsUserUpdated(true);
      })
      .catch((error) => {
        setErrors({ general: error.response?.data?.message || "Hubo un error al crear el usuario." });
      });
  };

  return (
    <ContentBoxComponent
      title={"MODIFICAR USUARIO"}
      userId={userId}
      sidebarOptions={[
        { path: "/list-users", label: "📋 Lista de usuarios" },
        { path: "/create-user", label: "➕ Crear nuevo usuario" },
      ]}
    >
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex justify-center px-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          {formFields.map((field) =>
            field.type === "select" ? (
              <SelectComponent
                key={field.name}
                span={field.label}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={onInputChange}
                options={field.options || []}
              />
            ) : (
              <InputComponent
                key={field.name}
                label={field.label}
                type={field.type}
                value={formData?.[field.name] || ""}
                id={field.name}
                name={field.name}
                onChange={onInputChange}
                placeholder={field.placeholder || ""}
                errorMessage={errors[field.name]}
              />
            )
          )}
          <div className="col-span-2">
            <button
              type="submit"
              className="mt-8 btn bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              Editar usuario
            </button>
          </div>
        </div>
        <ModalComponent
          isOpen={isUserUpdated}
          title="Usuario editado!"
          content="El usuario ha sido editado correctamente"
          onClose={() => {
            setIsUserUpdated(false);
            navigate("/list-users");
          }}
        />
      </form>
    </ContentBoxComponent>
  );
};

export default UpdateUserView;
