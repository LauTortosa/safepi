import { useEffect, useState } from "react";
import { riskImpactLabel, riskLocationLabel, riskProbabilityLabel, riskStateLabel } from "../utils/displayLabels";
import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import TableComponent from "../components/TableComponent";
import api from "../api/axiosConfig";

const RiskListView = () => {
    const [risks, setRisks] = useState([]);
    const userRole = localStorage.getItem("userRole");

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
                            { path: "/list-risks", label: "📋 Lista de riesgos" },
                            { path: "/create-risks", label: "➕ Añadir riesgos" }
                        ]}
                    />
                    <div>
                        <TableComponent
                            headers={["#", "Fecha", "Lugar", "Riesgo", "Probabilidad", "Impacto", "Estado", "Gravedad"]}
                            rows={risks.map((risk, index) => [
                                index + 1,
                                risk.date,
                                riskLocationLabel[risk.location] || risk.location,
                                risk.description,
                                riskProbabilityLabel[risk.probability] || risk.probability,
                                riskImpactLabel[risk.impact] || risk.impact,
                                riskStateLabel[risk.state] || risk.state,
                                risk.gravity
                            ])}
                            userRole={userRole}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskListView;