const TableComponent = ({ headers, rows, userRole, onDelete, onUpdate }) => {
    return (
        <div>
            <main className="flex-1 flex justify-center px-6">
                <div className="bg-white shadow-lg rounded-lg p-8 mb-10 ml-80">
                    <div className="overflow-x-auto">
                        {/* TODO orden ascendente/descendente */}
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-blue-900 text-white">
                                    {headers.map((header, index) => (
                                        <th key={index} className="p-2 border">
                                            {header}
                                        </th>
                                    ))}
                                    {userRole === "ADMIN" && (
                                        <th className="p-2 border">Opciones</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.length > 0 ? (
                                    rows.map((row, index) => (
                                        <tr key={index} className="hover:bg-gray-200">
                                            {row.map((cell, i) => (
                                                <td key={i} className="p-2 border">{cell}</td>
                                            ))}

                                            {userRole === "ADMIN" && (
                                                <td className="p-2 border">
                                                    <span 
                                                        className="cursor-pointer mr-4"
                                                        onClick={() => onDelete(row[1])}    
                                                    >
                                                        🗑️
                                                    </span>
                                                    <span 
                                                        className="cursor-pointer"
                                                        onClick={() => onUpdate(row[1])}
                                                    >✏️</span>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="text-center p-4">
                                            No hay riesgos disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default TableComponent;