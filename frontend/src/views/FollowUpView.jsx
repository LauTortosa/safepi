import { useParams } from "react-router-dom";

import ContentBoxComponent from "../components/ContentBoxComponent";
import { useAuthUser } from "../hooks/useAuthUser";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const FollowUpView = () => {
    const { workEventId } = useParams();
    const { token, userRole, userId } = useAuthUser();
    const [workEvent, setWorkEvent] = useState(null);

    useEffect(() => {
        if (token) {
            api.get(`/workEvents/${workEventId}`, { headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                setWorkEvent(response.data);
            })
            .catch((error) => {
                console.error("WorkEvent no encontrado.", error);
            });
        }
    }, [workEventId, token]);

    return (
        <ContentBoxComponent
            title={"SEGUIMIENTO DEL INCIDENTE/ACCIDENTE"}
            userRole={userRole}
            userId={userId}
            sidebarOptions={[
                ...(userRole === "ADMIN" ? [{ path: "/list-workEvents", label: "📋 Todos los incidentes/accidentes" }] : []),
                { path: `/list-workEvents/${userId}`, label: "📋 Mis incidentes/accidentes" },
                { path: "/create-workEvent", label: "➕ Añadir Incidente/Accidente" }
            ]}
        >
            {workEvent ? (
                <div>
                    <h2 className="text-xl font-bold">{workEvent.name} {workEvent.last_name}</h2>
                    <p><strong>Fecha:</strong> {workEvent.date}</p>
                    <p><strong>Categoría:</strong> {workEvent.category}</p>
                    <p><strong>Tipo:</strong> {workEvent.typeWorkEvent}</p>
                    <p><strong>Impacto:</strong> {workEvent.impact}</p>  
                    <p><strong>Descripción:</strong> {workEvent.description}</p>  
                    <p><strong>Ubicación:</strong> {workEvent.location}</p>  
                    <p><strong>Testigos:</strong> {workEvent.witnesses}</p>  
                    <p><strong>Primeros auxilios:</strong> {workEvent.firstAid}</p>  
                </div>
            ) : ( 
                <p>Cargando...</p>    
            )}
        </ContentBoxComponent>
    );
};

export default FollowUpView;