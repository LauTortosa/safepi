import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const logout: () => void = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  }

  return (
    <div className="navbar bg-gray-900 text-gray-100 shadow-lg px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-900 rounded-lg w-52"
          >
            <li>
              <a className="hover:bg-blue-500 p-2 rounded">
                Gestión de riesgos
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <Link to="/home">
          <span className="text-xl font-bold tracking-wide text-cyan-500">
            Safepi
          </span>
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-900 rounded-lg w-52"
          >
            <Link to="/profile">
              <li>
                <span className="hover:bg-blue-500 p-2 rounded">Perfil</span>
              </li>
            </Link>
            <li>
              <a className="hover:bg-blue-500 p-2 rounded">Configuración</a>
            </li>
            <li >
              <a className="hover:bg-cyan-500 p-2 rounded text-gray-900" onClick={logout}>
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
