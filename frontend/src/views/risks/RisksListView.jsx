import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser, useGeneratePdf } from "../../hooks";
import { riskImpactLabel, riskLocationLabel, riskProbabilityLabel, riskStateLabel } from "../../utils/displayLabels";
import {TableComponent, ModalComponent, ContentBoxComponent }  from "../../components";

import api from "../../api/axiosConfig";

const RiskListView = () => {
    const [risks, setRisks] = useState([]);
    const { token, userRole, userId } = useAuthUser();
    const [isRiskDeleted, setIsRiskDeleted] = useState(false);
    const navigate = useNavigate();
    const { generatePDF } = useGeneratePdf();

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

    const headers = ["#", "Id", "Fecha", "Riesgo", "Lugar", "Probabilidad", "Impacto", "Tipo", "Estado", "Nombre"];

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
                .delete(`/risks/${riskId}`, {
                    headers: { Authorization: `Bearer ${token}` }
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

    const onGeneratePDF = () => {
        const fileName = "riskList.pdf";

        generatePDF(fileName, [
            {
                title: "Lista de Riesgos Laborales",
                headers: headers,
                rows: rows
            }
        ]);
    }; 

    return (
        <ContentBoxComponent
            title={"LISTA DE RIESGOS"}
            userRole={userRole}
            userId={userId}
            sidebarOptions={[
                ...(userRole === "ADMIN" ? [{ path: "/list-risks", label: "📋 Todos los riesgos" }] : []),
                { path: `/list-risks/${userId}`, label: "📋 Mis riesgos" },
                { path: "/create-risk", label: "➕ Añadir riesgos" }
            ]}
        >
            <TableComponent
                headers={headers}
                rows={rows}
                userRole={userRole}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
            <ModalComponent
                isOpen={isRiskDeleted}
                title={"Riesgo eliminado!"}
                content={"El riesgo ha sido eliminado correctamente."}
                onClose={() => setIsRiskDeleted(false)}
            />
            <button
                onClick={onGeneratePDF}
                className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                📄 Generar PDF
            </button>
        </ContentBoxComponent>
    );
};

export default RiskListView;