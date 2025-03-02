import { useState } from "react";

import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import InputComponent from "../components/InputComponent";
import SelectComponent from "../components/SelectComponent";
import ModalComponent from "../components/ModalComponent";

import api from "../api/axiosConfig";

import { useUserOptions } from "../hooks/useUserOptions";
import { useUserFormReducer } from "../hooks/useUserFormReducer";
import { useUserFormValidate } from "../hooks/useUserFormValidate";
import { useAuthUser } from "../hooks/useAuthUser";

const CreateUserView = () => {
  const [formData, dispatch] = useUserFormReducer();
  const {positions, roles } = useUserOptions();
  const [isUserCreated, setIsUserCreated] = useState(false);
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

  const onInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm(formData)) return;
  
    api
      .post("/users", formData, { headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        setIsUserCreated(true);
        dispatch({ type: "RESET_FORM" });
      })
      .catch((error) => {
          setErrors({ general: error.response?.data?.message || "Hubo un error al crear el usuario."});
      });
  };

  return (
    <div >
      { /* TODO Input para repetir contraseña*/ }
      <NavbarComponent />
      <div className="min-h-screen max-w-auto bg-gray-100 flex flex-col pt-16 ml-60">
        <h1 className="text-3xl font-semibold text-center mb-6 pt-16 text-blue-900 w-full">
          CREAR USUARIO
        </h1>

        <div className="flex ">
          <SidebarComponent 
            options={[
              { path: "/list-users", label: "📋 Lista de usuarios"},
              { path: "/create-user", label: "➕ Crear nuevo usuario"},
            ]}
          />
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex justify-center px-6"
          >
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mb-10">
              <div>
                {formFields.map((field) => 
                  field.type === "select" ? (
                    <SelectComponent
                      key={field.name}
                      span={field.label}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={onInputChange}
                      options={field.options || []}
                    />
                  ) : (
                    <InputComponent
                      key={field.name}
                      label={field.label}
                      type={field.type}
                      value={formData[field.name]}
                      id={field.name}
                      name={field.name}
                      onChange={onInputChange}
                      placeholder={field.placeholder || ""}
                      errorMessage={errors[field.name]}
                    />
                  )    
                )}
              </div>
              <button
                  type="submit"
                  className="mt-8 btn bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  Crear usuario
                </button>
              <ModalComponent 
                isOpen={isUserCreated}
                title="Usuario creado!"
                content="El usuario ha sido creado correctamente"
                onClose={() => setIsUserCreated(false)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserView;
