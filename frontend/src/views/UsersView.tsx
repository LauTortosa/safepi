import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import ContentBoxComponent from "../components/ContentBoxComponent";

const UsersView: React.FC = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="min-h-screen bg-gray-100 flex flex-col pt-16">
        <h1 className="text-3xl font-semibold text-center mb-6 ml-32 pt-16 text-blue-900 w-full">
          GESTIÓN DE USUARIOS
        </h1>

        <div className="flex">
          <SidebarComponent />
          <main className="flex-1 flex justify-center ml-64 px-6">
            <ContentBoxComponent />
          </main>
        </div>
      </div>
    </div>
  );
};

export default UsersView;
