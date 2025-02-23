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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formFields = [
    { label: "Nombre", type: "text", name: "name", placeholder: "Nombre", minLength: 3, maxLength: 25 },
    { label: "Apellidos", type: "text", name: "last_name", placeholder: "Apellidos", minLength: 3 },
    { label: "Fecha de nacimiento", type: "date", name: "birthday" },
    { label: "Fecha de antigüedad laboral", type: "date", name: "start_date" },
    { label: "Posición laboral", type: "select", name: "position", options: positions },
    { label: "Nombre de usuario", type: "text", name: "username", placeholder: "Nombre de usuario", minLength: 5, maxLength: 20 },
    { label: "Email", type: "email", name: "email", placeholder: "Email" },
    { label: "Contraseña", type: "password", name: "password", placeholder: "Password", minLength: 8, maxLength: 30 },
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
  
    const newErrors: { [key: string]: string } = {};

    for (const field of formFields) {
      const value = formData[field.name as keyof typeof formData];
  
      if (!value) {
        newErrors[field.name] = `El campo ${field.label} es requerido.`;
        break; 
      }
  
      if (field.minLength && value.length < field.minLength) {
        newErrors[field.name] = `${field.label} debe tener al menos ${field.minLength} caracteres.`;
        break;
      }
  
      if (field.maxLength && value.length > field.maxLength) {
        newErrors[field.name] = `${field.label} no puede tener más de ${field.maxLength} caracteres.`;
        break;
      }
  
      if (field.type === "email" && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
        newErrors[field.name] = "Por favor, introduce un correo electrónico válido.";
        break;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
        dispatch({ type: "RESET_FORM" });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors({ general: error.response.data.message || "Hubo un error al crear el usuario."});
        } else {
          console.error("Error al crear el usuario", error);
          setErrors({ general: "Hubo un error inesperado."});
        }
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
