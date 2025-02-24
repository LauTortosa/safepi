import { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import api from "../api/axiosConfig";

const RiskListView = () => {
    const [risks, setRisks] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token) {
            api
            .get("/risks", { 
                headers: { 
                    Authorization: `Bearer ${token}`, 
                }, 
                
            })
            
            .then((response) => {
                setRisks(response.data);
            }) 
            .catch((error) => {
                console.error("Error al obtener la lista de riesgos", error);
            });
        } else {
            console.error("Token no encontrado");
        };
    }, []);

    return (
        <div >
            <NavbarComponent />
            <div className="min-h-screen max-w-auto bg-gray-100 flex flex-col pt-16 ml-60">
                <h1 className="text-3xl font-semibold text-center mb-6 pt-16 text-blue-900 w-full">
                    LISTA DE RIESGOS 
                </h1>

                <div className="flex ">
                    <SidebarComponent 
                        options={[
                            { path: "/list-risks", label: "📋 Lista de riesgos"}
                        ]}
                    />
                    <main className="flex-1 flex justify-center px-6">
                        <div className="bg-white shadow-lg rounded-lg p-8 mb-10">
                            <div className="overflow-x-auto">
                                {/* TODO orden ascendente/descendente */}
                                <table className="table-auto w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-blue-900 text-white">
                                            <th className="p-2 border">#</th>
                                            <th className="p-2 border">Fecha</th>
                                            <th className="p-2 border">Lugar</th>
                                            <th className="p-2 border">Riesgo</th>
                                            <th className="p-2 border">Probabilidad de riesgo</th>
                                            <th className="p-2 border">Impacto del riesgo</th>
                                            <th className="p-2 border">Estado</th>
                                            <th className="p-2 border">Email</th>
                                            <th className="p-2 border">Nivel de riesgo</th>
                                            <th className="p-2 border">Gravedad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {risks.length > 0 ? (
                                        risks.map((risk, index) => (
                                            <tr key={risk.id} className="hover:bg-gray-200">
                                                <td className="p-2 border">{index + 1}</td>
                                                <td className="p-2 border">{risk.date}</td>
                                                <td className="p-2 border">{risk.location}</td>
                                                <td className="p-2 border">{risk.description}</td>
                                                <td className="p-2 border">{risk.probability}</td>
                                                <td className="p-2 border">{risk.impact}</td>
                                                <td className="p-2 border">{risk.state}</td>
                                                <td className="p-2 border">{risk.risk}</td>
                                                <td className="p-2 border">{risk.gravity}</td>
                                                <td className="p-2 border">
                                                    <span className="cursor-pointer">🗑️</span>
                                                    <span className="cursor-pointer">✏️</span>  
                                                </td>
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
            </div>
        </div>
    );
};

export default RiskListView;