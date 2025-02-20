import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const logout: () => void = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="navbar bg-gray-900 text-gray-100 shadow-lg px-6 fixed top-0 w-full z-50">
      <div className="navbar-start">
        <Link to="/home">
          <span className="text-xl font-bold tracking-wide text-cyan-500">
            Safepi
          </span>
        </Link>
      </div>

      <div className="navbar-center space-x-6">
        <Link to="/risks" className="hover:text-cyan-400">
          Gestión de riesgos
        </Link>
        <Link to="/users" className="hover:text-cyan-400">
          Gestión de usuarios
        </Link>
        <Link to="/reports" className="hover:text-cyan-400">
          Incidentes/Accidentes
        </Link>
        <Link to="/settings" className="hover:text-cyan-400">
          Formación
        </Link>
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 h-10 rounded-full border-2 border-cyan-500">
              <img alt="Avatar" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-800 rounded-lg w-52"
          >
            <Link to="/profile">
              <li>
                <span className="hover:bg-blue-600 p-2 rounded">Perfil</span>
              </li>
            </Link>
            <li>
              <a className="hover:bg-blue-600 p-2 rounded">Configuración</a>
            </li>
            <li>
              <a
                className="hover:bg-cyan-500 p-2 rounded text-gray-900"
                onClick={logout}
              >
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
