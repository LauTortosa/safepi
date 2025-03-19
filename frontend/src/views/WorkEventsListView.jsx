import { useEffect, useState } from "react";
import { useAuthUser } from "../hooks/useAuthUser";
import api from "../api/axiosConfig";

import ContentBoxComponent from "../components/ContentBoxComponent";
import TableComponent from "../components/TableComponent";

const WorkEventsView = () => {
    const [workEvents, setWorkEvents] = useState([]);
    const { token, userRole } = useAuthUser();

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

    const rows = workEvents.map((workEvent, index) => [
        index + 1,
        workEvent.id,
        workEvent.date,
        workEvent.category,
        workEvent.typeWorkEvent,
        workEvent.impact,
        workEvent.name + " " + workEvent.last_name
    ]);


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
                headers={["#", "Id", "Fecha", "Categoria", "Tipo", "Impacto", "Nombre"]}
                rows={rows}
                userRole={userRole}
            />

        </ContentBoxComponent>
    );
};

export default WorkEventsView;