import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import { workEventCategoryLabel } from "../../utils/displayLabels";
import { ContentBoxComponent, WorkEventInfoComponent, FollowUpComponent } from "../../components";
import api from "../../api/axiosConfig";

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
        return <p className="text-center">Cargando información...</p>;
    }
    
    return(
        <ContentBoxComponent
            title={`SEGUIMIENTO DEL ${workEventCategoryLabel[workEvent.category]}`}
            userRole={userRole}
            userId={userId}
            sidebarOptions={[
                ...(userRole === "ADMIN" ? [{ path: "/list-workEvents", label: "📋 Todos los incidentes/accidentes" }] : []),
                { path: `/workEvents/users/${userId}/workEvents`, label: "📋 Mis Incidentes/Accidentes"},
                ...(userRole === "ADMIN" ? [{ path: "/create-workEvent", label: "➕ Añadir Incidente/Accidente" }] : []),
            ]}
        >
            <WorkEventInfoComponent workEvent={workEvent} />
            <FollowUpComponent workEvent={workEvent} workEventId={workEventId} />
        </ContentBoxComponent>
    );
};

export default WorkEventDetailsView;