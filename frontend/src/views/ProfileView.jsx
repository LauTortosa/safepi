import { useAuthUser } from "../hooks/useAuthUser.jsx";

import NavbarComponent from "../components/NavbarComponent.jsx";

const ProfileView = () => {
  const user = useAuthUser();

  return (
    <div>
      <NavbarComponent />
      <div className="min-h-screen flex flex-col items-center bg-gray-100 pt-20">
        <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg pb-16 ">
          <h1 className="text-3xl font-bold text-center mb-6">
            Información de perfil
          </h1>
          {user ? (
            // TODO cambiar OPERATOR por Operador 
            // TODO cambiar formato de las fechas a dd-MM-YYY
            <div className="mt-4 text-center">
              <div className="inline-block text-justify max-w-md">
                <p className="text-gray-600 font-semibold mb-4">
                  Nombre: {user.name} {user.last_name}
                </p>
                <p className="text-gray-600 font-semibold mb-4">
                  Email: {user.email}
                </p>
                <p className="text-gray-600 font-semibold mb-4">
                  Fecha de nacimiento: {user.birthday}
                </p>
                <p className="text-gray-600 font-semibold mb-4">
                  Fecha de inicio: {user.start_date}
                </p>
                <p className="text-gray-600 font-semibold mb-4">
                  Edad: {user.age}
                </p>
                <p className="text-gray-600 font-semibold">
                  Posición laboral: {user.position}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">Cargando información...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
