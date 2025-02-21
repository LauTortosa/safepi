import { Link } from "react-router-dom";

const SidebarComponent: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-blue-900 text-white shadow-lg p-6 fixed top-16 left-0 overflow-y-auto">
      <ul className="space-y-4">
        <li>
          <Link to={"/usersList"}>
            <button className="w-full text-left p-3 rounded transition-all bg-blue-800 hover:bg-blue-700">
              📋 Lista de usuarios
            </button>
          </Link>
        </li>

        <li>
          <Link to={"/create-user"}>
            <button className="w-full text-left p-3 rounded transition-all bg-blue-800 hover:bg-blue-700">
              ➕ Crear nuevo usuario
            </button>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SidebarComponent;
