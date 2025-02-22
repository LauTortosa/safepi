import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import InputComponent from "../components/InputComponent";
import SelectComponent from "../components/SelectComponent";
import ModalComponent from "../components/ModalComponent";

import api from "../api/axiosConfig";
import { useState } from "react";
import { useUserOptions } from "../hooks/useUserOptions";
import { useUserFormReducer } from "../hooks/useUserFormReducer";

const CreateUserView: React.FC = () => {
  const [formData, dispatch] = useUserFormReducer();
  const {positions, roles } = useUserOptions();
  const [isUserCreated, setIsUserCreated] = useState(false);

  const formFields = [
    { label: "Nombre", type: "text", name: "name", placeholder: "Nombre" },
    { label: "Apellidos", type: "text", name: "last_name", placeholder: "Apellidos" },
    { label: "Fecha de nacimiento", type: "date", name: "birthday", placeholder: "" },
    { label: "Fecha de antigüedad laboral", type: "date", name: "start_date", placeholder: "" },
    { label: "Posición laboral", type: "select", name: "position", options: positions },
    { label: "Nombre de usuario", type: "text", name: "username", placeholder: "Nombre de usuario" },
    { label: "Email", type: "email", name: "email", placeholder: "Email" },
    { label: "Contraseña", type: "password", name: "password", placeholder: "Password" },
    { label: "Rol de usuario", type: "select", name: "role", options: roles },
  ];

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    api
      .post("/users", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const token = response.data.token;
        if (token) {
          localStorage.setItem("authToken", token);
        }

        setIsUserCreated(true);
        dispatch({ type: "RESET_FORM"});
      })
      .catch((error) => {
        console.error("Error al crear el usuario", error);
      });
  };

  return (
    <div>
      <NavbarComponent />
      <div className="min-h-screen max-w-auto bg-gray-100 flex flex-col pt-16">
        <h1 className="text-3xl font-semibold text-center mb-6 pt-16 text-blue-900 w-full">
          CREAR USUARIO
        </h1>

        <div className="flex ">
          <SidebarComponent />
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
                      value={formData[field.name as keyof typeof formData]}
                      onChange={onInputChange}
                      options={field.options || []}
                    />
                  ) : (
                    <InputComponent
                      key={field.name}
                      label={field.label}
                      type={field.type}
                      value={formData[field.name as keyof typeof formData]}
                      id={field.name}
                      name={field.name}
                      onChange={onInputChange}
                      placeholder={field.placeholder || ""}
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
