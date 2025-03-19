import { useEffect, useState } from "react";
import { riskImpactLabel, riskLocationLabel, riskProbabilityLabel, riskStateLabel } from "../utils/displayLabels";
import { useAuthUser } from "../hooks/useAuthUser";

import TableComponent from "../components/TableComponent";
import ContentBoxComponent from "../components/ContentBoxComponent";

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
                .get(`/risks/users/${userId}/risks`, {
                    headers: { Authorization: `Bearer ${token}` }
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
        <ContentBoxComponent
            title={"MIS RIESGOS"}
            userRole={userRole}
            userId={userId}
            sidebarOptions={[
                ...(userRole === "ADMIN" ? [{ path: "/list-risks", label: "📋 Todos los riesgos" }] : []),
                { path: `/list-risks/${userId}`, label: "📋 Mis riesgos" },
                { path: "/create-risk", label: "➕ Añadir riesgos" }
            ]}
        >
            <TableComponent
                headers={["#", "Fecha", "Lugar", "Riesgo", "Probabilidad", "Impacto", "Tipo", "Estado"]}
                rows={rows}
                userRole={userRole}
                showOptions={showOptions}
            />
        </ContentBoxComponent>
    );
};

export default RiskListUserView;