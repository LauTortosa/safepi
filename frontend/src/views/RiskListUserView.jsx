import { useEffect, useState } from "react";
import { riskImpactLabel, riskLocationLabel, riskProbabilityLabel, riskStateLabel } from "../utils/displayLabels";
import { useAuthUser } from "../hooks/useAuthUser";

import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import TableComponent from "../components/TableComponent";

import api from "../api/axiosConfig";

const RiskListUserView = () => {
    const [risks, setRisks] = useState([]);
    const { userRole, userId, token } = useAuthUser();
    const showOptions = userRole === "ADMIN" && false;

    const rows = risks.map((risk, index) => [
        index + 1,
        risk.date,
        risk.description,
        riskLocationLabel[risk.location] || risk.location,
        riskProbabilityLabel[risk.probability] || risk.probability,
        riskImpactLabel[risk.impact] || risk.impact,
        risk.risk,
        riskStateLabel[risk.state] || risk.state,
    ]);

    useEffect(() => {
        if (token) {
            api
                .get(`/risks/users/${userId}/risks`, { headers: { Authorization: `Bearer ${token}` }
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
    }, [token]);

    return (
        <div>
            <NavbarComponent />
            <div className="min-h-screen max-w-auto bg-gray-100 flex flex-col pt-16 ml-20">
                <h1 className="text-3xl font-semibold text-center mb-6 pt-16 text-blue-900 w-full">
                    LISTA DE RIESGOS
                </h1>

                <div className="flex ">
                    <SidebarComponent
                        options={[
                            ...(userRole === "ADMIN" ? [{ path: "/list-risks", label: "📋 Todos los riesgos" }] : []),
                            { path: `/list-risks/${userId}`, label: "📋 Mis riesgos" },
                            { path: "/create-risks", label: "➕ Añadir riesgos" }
                        ]}
                    />
                    <div>
                        <TableComponent
                            headers={["#", "Fecha", "Lugar", "Riesgo", "Probabilidad", "Impacto", "Tipo", "Estado"]}
                            rows={rows}
                            userRole={userRole}
                            showOptions={showOptions}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskListUserView;