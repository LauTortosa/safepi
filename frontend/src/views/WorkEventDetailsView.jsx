import { useParams } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

import ContentBoxComponent from "../components/ContentBoxComponent";
import WorkEventInfoComponent from "../components/WorkEventInfoComponent";
import FollowUpComponent from "../components/FollowUpComponent";

const WorkEventDetailsView = () => {
    const { workEventId } = useParams();
    const { token, userRole, userId } = useAuthUser();
    const [workEvent, setWorkEvent] = useState(null);

    useEffect(() => {
        if (token) {
            api.get(`/workEvents/${workEventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                    setWorkEvent(response.data);
                })
                .catch((error) => {
                    console.error("WorkEvent no encontrado.", error);
                });
        }
    }, [workEventId, token]);

    if (!workEvent) {
        return <p className="text-center">Cargando información del incidente/accidente...</p>;
    }
    
    return(
        <ContentBoxComponent
            title={`SEGUIMIENTO DEL "${workEvent.category}"`}
            userRole={userRole}
            userId={userId}
            sidebarOptions={[
                ...(userRole === "ADMIN" ? [{ path: "/list-workEvents", label: "📋 Todos los incidentes/accidentes" }] : []),
                { path: "/create-workEvent", label: "➕ Añadir Incidente/Accidente" }
            ]}
        >
            <WorkEventInfoComponent workEvent={workEvent} />
            <FollowUpComponent workEvent={workEvent} workEventId={workEventId} />
        </ContentBoxComponent>
    );
};

export default WorkEventDetailsView;