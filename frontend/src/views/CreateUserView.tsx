import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";

const CreateUserView: React.FC = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="min-h-screen max-w-auto bg-gray-100 flex flex-col pt-16">
        <h1 className="text-3xl font-semibold text-center mb-6 pt-16 text-blue-900 w-full">
          CREAR USUARIO
        </h1>

        <div className="flex ">
          <SidebarComponent />
          <main className="flex-1 flex justify-center px-6">
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8"></div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateUserView;
