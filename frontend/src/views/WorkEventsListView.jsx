import { useEffect, useState } from "react";
import { useAuthUser } from "../hooks/useAuthUser";
import api from "../api/axiosConfig";

import ContentBoxComponent from "../components/ContentBoxComponent";
import TableComponent from "../components/TableComponent";
import ModalComponent from "../components/ModalComponent";
import { workEventCategoryLabel, workEventTypeWorkEventLabel, riskImpactLabel } from "../utils/displayLabels";
import { useNavigate } from "react-router-dom";

const WorkEventsView = () => {
    const [workEvents, setWorkEvents] = useState([]);
    const { token, userRole } = useAuthUser();
    const [isWorkEventDeleted, setIsWorkEventDeleted] = useState(false);
    const navigate = useNavigate();

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
            api.get("/workEvents", {headers: { Authorization: `Bearer ${token}` } 
            })
            .then((response) => {
                setWorkEvents(response.data); 
            })
            .catch((error) => {
                console.log("Error al obtener la lista de incidentes/accidentes", error);
            })
        } else { 
            console.error("Token no encontrado");
        }
    }, []);

    const onDelete = (workEventId) => {
        console.log("workeventid", workEventId);
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
                { path: "/list-workevents", label: "Lista de Incidentes/Accidentes"},
                { path: "/create-workevent", label: "Añadir Incidente/Accidente"},
            ]}
        >
            <TableComponent
                headers={["#","Id", "Nombre", "Fecha", "Categoria", "Tipo", "Impacto", "Detalle" ]}
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
        </ContentBoxComponent>
    );
};

export default WorkEventsView;