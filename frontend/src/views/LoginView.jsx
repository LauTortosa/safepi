import React from "react";
import LoginFormComponent from "../components/LoginFormComponent";

const LoginView = () => {
  const handleLoginSubmit = (username, password) => {
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
  <div className="w-full max-w-md p-10 bg-gray-100 shadow-2xl rounded-2xl text-center">
    <h1 className="text-4xl font-extrabold text-blue-900 mb-6">Safepi</h1>
    <LoginFormComponent onSubmit={handleLoginSubmit} />
  </div>
</div>

  );
};

export default LoginView;
