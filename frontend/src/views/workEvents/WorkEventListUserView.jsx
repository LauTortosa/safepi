import { useEffect, useState } from "react";
import { useAuthUser } from "../../hooks";
import { ContentBoxComponent, TableComponent } from "../../components";
import { workEventCategoryLabel, workEventTypeWorkEventLabel, riskImpactLabel } from "../../utils/displayLabels";
import api from "../../api/axiosConfig";

const WorkEventListUserView = () => {
    const [workEvents, setWorkEvents] = useState([]);
    const { token, userRole, userId } = useAuthUser();

    const rows = workEvents.map((workEvent, index) => [
        index + 1,
        workEvent.id,
        `${workEvent.name} ${workEvent.last_name}`,
        workEvent.date,
        workEventCategoryLabel[workEvent.category] || workEvent.category,
        workEventTypeWorkEventLabel[workEvent.typeWorkEvent] || workEvent.typeWorkEvent,
        riskImpactLabel[workEvent.impact] || workEvent.impact,
        <span 
            className="cursor-pointer ml-4"
            onClick={() => navigate(`/followUps/${workEvent.id}`)}
        >👁️
        </span>
    ]);

    useEffect(() => {
        if (token) {
            api.get(`/workEvents/users/${userId}/workEvents`, {headers: { Authorization: `Bearer ${token}` } 
            })
            .then((response) => {
                setWorkEvents(response.data); 
            })
            .catch((error) => {
                console.log("Error al obtener la lista de incidentes/accidentes", error);
            })
        } else { 
           console.error("Error al obtener el token");
        }
    }, [token, userRole, userId]);

    return (
        <ContentBoxComponent
            title={"INCIDENTES Y ACCIDENTES LABORALES"}
            userRole={userRole}
            userId={userId}
            sidebarOptions={[
                { path: `/workEvents/users/${userId}/workEvents`, label: "📋 Mis Incidentes/Accidentes"},
                ...(userRole === "ADMIN" ? [{ path: "/list-workevents", label: "📋 Lista de Incidentes/Accidentes"}] : []),
                ...(userRole === "ADMIN" ? [{ path: "/create-workevent", label: "Añadir Incidente/Accidente"}] : []),
            ]}
        >
            <TableComponent
                headers={["#","Id", "Nombre", "Fecha", "Categoria", "Tipo", "Impacto", "Detalle" ]}
                rows={rows}
                userRole={userRole}
            />
        </ContentBoxComponent>
    );
};

export default WorkEventListUserView;