import { Link } from "react-router-dom";

const SidebarComponent = ({ options = [] }) => {

  return (
    <aside className="w-64 h-screen bg-blue-900 text-white shadow-lg p-6 fixed top-16 left-0 overflow-y-auto">
      <ul className="space-y-4">
        {options.length > 0 ? (
          options.map((option, index) => (
            <li key={index}>
              <Link to={option.path}>
                <button className="w-full text-left p-3 rounded transition-all bg-blue-800 hover:bg-blue-700">
                  {option.label}
                </button>
              </Link>
            </li>
          ))
        ) : ([] )
        }
      </ul>
    </aside>
  );
};

export default SidebarComponent;
