import React from "react";

const HomeView: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Inicio</h1>
        <p className="text-gray-700 text-center">
          Página del usuario
        </p>
      </div>
    </div>
  );
};

export default HomeView;
