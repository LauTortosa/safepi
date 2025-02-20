import { useAuthUser } from "../hooks/useAuthUser.tsx";
import NavbarComponent from "../components/NavbarComponent";

const HomeView: React.FC = () => {
    const user = useAuthUser(); 
  
  return (
    <div>
      <NavbarComponent />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Inicio</h1>
          {user ? (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">
                Bienvenido/a, {user.name} {user.last_name}!
              </p>
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
