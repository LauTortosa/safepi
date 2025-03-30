import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthUser, useGeneratePdf } from "../../hooks";
import { ContentBoxComponent, TableComponent, ModalComponent } from "../../components";
import { workEventCategoryLabel, workEventTypeWorkEventLabel, riskImpactLabel } from "../../utils/displayLabels";
import api from "../../api/axiosConfig";

const WorkEventListView = () => {
    const [workEvents, setWorkEvents] = useState([]);
    const { token, userRole, userId } = useAuthUser();
    const [isWorkEventDeleted, setIsWorkEventDeleted] = useState(false);
    const navigate = useNavigate();
    const { generatePDF } = useGeneratePdf();

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

    const headers= ["#","Id", "Nombre", "Fecha", "Categoria", "Tipo", "Impacto", "Detalle" ];

    useEffect(() => {
        if (token) {
            api.get( "/workEvents", {headers: { Authorization: `Bearer ${token}` } 
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

    const onDelete = (workEventId) => {
        if (token) {
            api.delete(`/workEvents/${workEventId}`, { headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                setWorkEvents((prevWorkEvents) => prevWorkEvents.filter((workEvents) => workEvents.id !== workEventId));
                setIsWorkEventDeleted(true);
            })
            .catch((error) => {
                console.error("Error al eliminar el indicente/accidente", error);
            })
        } else {
            console.error("Token no encontrado");
        };
    };

    const onUpdate = (workEventId) => {
        navigate(`/update-workEvent/${workEventId}`);
    };

    return (
        <ContentBoxComponent
            title={"INCIDENTES Y ACCIDENTES LABORALES"}
            userRole={userRole}
            sidebarOptions={[
                { path: `/workEvents/users/${userId}/workEvents`, label: "📋 Mis Incidentes/Accidentes"},
                ...(userRole === "ADMIN" ? [{ path: "/list-workevents", label: "📋 Lista de Incidentes/Accidentes"}] : []),
                ...(userRole === "ADMIN" ? [{ path: "/create-workevent", label: "Añadir Incidente/Accidente"}] : []),
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
                isOpen={isWorkEventDeleted}
                title={"Incidente/Accidente eliminado!"}
                content={"El incidente/accidente ha sido eliminado correctamente."}
                onClose={() => setIsWorkEventDeleted(false)}
            />
            <button
                onClick={() => generatePDF(
                    "Lista de Incidentes/Accidentes", 
                    headers, 
                    rows, 
                    "workEvents.pdf",
                    [headers.indexOf("Detalle")]
                )}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                📄 Descargar PDF
            </button>
        </ContentBoxComponent>
    );
};

export default WorkEventListView;