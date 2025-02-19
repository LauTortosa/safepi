import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";

import api from "../api/axiosConfig";

const HomeView: React.FC = () => {
  const [user, setUser] = useState<{
    name: string;
    last_name: string;
    username: string;
    email: string;
    birthday: string;
    start_date: string;
    position: string;
    age: number;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      api
        .get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener datos del usuario", error);
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Inicio</h1>
          <p className="text-gray-700 text-center">Página del usuario</p>
          {user ? (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">
                Bienvenido, {user.name} {user.last_name}!
              </p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">
                Fecha de nacimiento: {user.birthday}
              </p>
              <p className="text-gray-600">
                Fecha de inicio: {user.start_date}
              </p>
              <p className="text-gray-600">Edad: {user.age}</p>
              <p className="text-gray-600">Posición laboral: {user.position}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-center">Cargando información...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
