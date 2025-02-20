const SidebarComponent: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-blue-900 text-white shadow-lg p-6 fixed top-16 left-0 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">Menú</h2>
      <ul className="space-y-4">
        <li>
          <button className="w-full text-left p-3 rounded transition-all bg-blue-800 hover:bg-blue-700">
            📋 Lista de usuarios
          </button>
        </li>
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
