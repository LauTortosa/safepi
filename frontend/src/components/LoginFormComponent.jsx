import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

import { ValidationFormComponent, InputComponent } from "./";
import { useUserFormValidate } from "../hooks";

const LoginFormComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const formFields = [
    { label: "Usuario", type: "text", name: "username", placeholder: "Introduzca nombre de usuario", minLength: 3, maxLength: 20 },
    { label: "Contraseña", type: "password", name: "password", placeholder: "Introduzca la contraseña", minLength: 3, maxLength: 30 },
  ];

  const { errors, setErrors, validateForm } = useUserFormValidate(formFields);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim()});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm(formData)) return;

    api.post("/users/auth/login", formData)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        navigate('/home');
      })
      .catch((error) => {
        console.error("Error en el login", error);
        setErrors({ general: "Usuario o contraseña incorrectos" });
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      {formFields.map((field) => (
        <InputComponent
          key={field.name}
          label={field.label}
          type={field.type}
          id={field.name}
          name={field.name}
          value={formData[field.name]}
          onChange={onInputChange}
          placeholder={field.placeholder}
          errorMessage={errors[field.name]}
        />
      ))}
      {errors.general && (
        <ValidationFormComponent
          errorMessage={errors.general}
        />
      )}
      
      <button
        type="submit"
        className="mt-8 btn bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginFormComponent;
