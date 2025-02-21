import { Link } from "react-router-dom";

const SidebarComponent: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-blue-900 text-white shadow-lg p-6 fixed top-16 left-0 overflow-y-auto">
      <ul className="space-y-4">
        <Link to={"/usersList"}>
          <li>
            <button className="w-full text-left p-3 rounded transition-all bg-blue-800 hover:bg-blue-700">
              📋 Lista de usuarios
            </button>
          </li>
        </Link>

        <li>
          <button className="w-full text-left p-3 rounded transition-all bg-blue-800 hover:bg-blue-700">
            ➕ Crear nuevo usuario
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default SidebarComponent;
