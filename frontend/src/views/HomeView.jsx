import { useAuthUser } from "../hooks";
import { NavbarComponent } from "../components";

const HomeView = () => {
    const user = useAuthUser(); 
  
  return (
    <div>
      <NavbarComponent />
      <div className="min-h-screen flex flex-col items-center bg-gray-100 pt-20">
        <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
          {user ? (
            <div className="mt-4 text-center mb-6">
              <h1 className="text-3xl font-semibold">
                Hola {user.name} {user.last_name}!
              </h1>
            </div>
          ) : (
            <p className="text-gray-500 text-center">Cargando información...</p>
          )}
        <p className="text-xl text-start mb-6">Inicio rápido:</p>
        </div>

      </div>
    </div>
  );
};

export default HomeView;
