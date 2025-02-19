import React from "react";
import LoginFormComponent from "../components/LoginFormComponent";

const LoginView: React.FC = () => {
  const handleLoginSubmit = (username: string, password: string) => {
    console.log("Usuario", username);
    console.log("Password", password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Contenedor principal */}
      <div className="w-full max-w-md p-10 bg-white shadow-xl rounded-lg text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6">Safepi</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Iniciar sesión</h2>
        <LoginFormComponent onSubmit={handleLoginSubmit} />
      </div>
    </div>
  );
};

export default LoginView;
