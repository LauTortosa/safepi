import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import { riskImpactLabel, riskLocationLabel, riskProbabilityLabel, riskStateLabel } from "../utils/displayLabels";

import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import TableComponent from "../components/TableComponent";
import ModalComponent from "../components/ModalComponent";
import api from "../api/axiosConfig";

const RiskListView = () => {
    const [risks, setRisks] = useState([]);
    const { token, userRole, userId } = useAuthUser();
    const [isRiskDeleted, setIsRiskDeleted] = useState(false);
    const navigate = useNavigate();

    const rows = risks.map((risk, index) => [
        index + 1,
        risk.id,
        risk.date,
        riskLocationLabel[risk.location] || risk.location,
        risk.description,
        riskProbabilityLabel[risk.probability] || risk.probability,
        riskImpactLabel[risk.impact] || risk.impact,
        risk.risk,
        riskStateLabel[risk.state] || risk.state,
        [risk.name] + " " + risk.last_name
    ]);

    useEffect(() => {
        if (token) {
            api.get("/risks", {
                headers: { Authorization: `Bearer ${token}` },
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

    const onDelete = (riskId) => {
        if (token) {
            api
                .delete(`/risks/${riskId}`, { headers: { Authorization: `Bearer ${token}` }
                })
                .then(() => {
                    setRisks((prevRisks) => prevRisks.filter((risk) => risk.id !== riskId));
                    setIsRiskDeleted(true);
                })
                .catch((error) => {
                    console.error("Error al eliminar el riesgo", error);
                })
        } else {
            console.error("Token no encontrado");
        };
    };

    const onUpdate = (riskId) => {
        navigate(`/update-risk/${riskId}`);
    };

    return (
        <div >
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
                            headers={["#", "Id", "Fecha", "Riesgo", "Lugar", "Probabilidad", "Impacto", "Tipo", "Estado", "Nombre"]}
                            rows={rows}
                            userRole={userRole}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                    </div>
                </div>
                <ModalComponent
                    isOpen={isRiskDeleted}
                    title={"Riesgo eliminado!"}
                    content={"El riesgo ha sido eliminado correctamente."}
                    onClose={() => setIsRiskDeleted(false)}
                />
            </div>
        </div>
    );
};

export default RiskListView;