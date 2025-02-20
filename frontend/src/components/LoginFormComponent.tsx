import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axiosConfig";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginFormComponent: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData.username, formData.password);

    api
        .post("/users/auth/login", formData)
        .then((response) => {
          const token = response.data.token;
            console.log("Login con éxito", token);
            localStorage.setItem('authToken', token);
            navigate('/home');
        })
        .catch((error) => {
            console.error("Error en el login", error);
        });

    console.log("Username", formData.username);
    console.log("Password", formData.password);
  };

  return (
    // TODO que no detecte el espacio en blanco al escrubur el usename
    // TODO validaciones
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
  <div className="form-control w-full max-w-xs">
    <label className="label">
      <span className="label-text font-semibold text-gray-800 text-lg">Usuario</span>
    </label>
    <input
      type="text"
      id="username"
      name="username"
      value={formData.username}
      onChange={handleChange}
      placeholder="Introduzca nombre de usuario"
      className="input input-bordered w-full max-w-xs bg-gray-100 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
    />
  </div>

  <div className="form-control w-full max-w-xs mt-6">
    <label className="label">
      <span className="label-text font-semibold text-gray-800 text-lg">Contraseña</span>
    </label>
    <input
      type="password"
      id="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Introduzca la contraseña"
      className="input input-bordered w-full max-w-xs bg-gray-100 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
    />
  </div>

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
