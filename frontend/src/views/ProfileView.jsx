import { useAuthUser } from "../hooks/useAuthUser.jsx";
import { userPositionLabel } from "../utils/displayLabels.js";

import ContentBoxComponent from "../components/ContentBoxComponent";

const ProfileView = () => {
  const { user } = useAuthUser(); 

  return (
    <ContentBoxComponent
    title={"INFORMACIÓN DE PERFIL"}
    >
{user ? (
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
                  Posición laboral: {userPositionLabel[user.position]}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No se pudo cargar la información del usuario.</p>
          )}
    </ContentBoxComponent>
  );
};

export default ProfileView;

