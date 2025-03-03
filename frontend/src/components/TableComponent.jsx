import React, { useState } from 'react';

const TableComponent = ({ headers, rows, userRole, onDelete, onUpdate, showOptions = true }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const sortedItems = [...rows].sort((a, b) => {
        if (sortConfig.key === null) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const onSort = (key) => {
        let direction = 'asc';

        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });
    }; 

    return (
        <div>
            <main className="flex-1 flex justify-center px-6">
                <div className="bg-white shadow-lg rounded-lg p-8 mb-10 ml-80">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-blue-900 text-white">
                                    {headers.map((header, index) => (
                                        <th 
                                            key={index} 
                                            className="cursor-pointer p-2 border"
                                            onClick={() => onSort(index)}
                                            >
                                            {header} {sortConfig.key === index ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}
                                        </th>
                                    ))}
                                    {userRole === "ADMIN" && showOptions && (
                                        <th className="p-2 border">Opciones</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {sortedItems.length > 0 ? (
                                    sortedItems.map((row, index) => (
                                        <tr key={index} className="hover:bg-gray-200">
                                            {row.map((cell, i) => (
                                                <td key={i} className="p-2 border">{cell}</td>
                                            ))}

                                            {userRole === "ADMIN" && showOptions && (
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