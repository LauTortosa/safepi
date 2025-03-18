import { useEffect, useState } from "react";
import { useAuthUser } from "../hooks/useAuthUser";
import api from "../api/axiosConfig";

import ContentBoxComponent from "../components/ContentBoxComponent";

const WorkEventsView = () => {
    const [workEvents, setWorkEvents] = useState();
    const { token, userRole } = useAuthUser();

    useEffect(() => {
        if (token) {
            api.get("/workEvents", {headers: { Authorization: `Bearer ${token}` } 
            })
            .then((response) => {
                setWorkEvents(response.data); 
                console.log("response get", response.data);
            })
            .catch((error) => {
                console.log("Error al obtener la lista de incidentes/accidentes", error);
            })
        } else { 
            console.error("Token no encontrado");
        }
    }, []);


    return (
        <ContentBoxComponent
            title={"INCIDENTES Y ACCIDENTES LABORALES"}
            userRole={userRole}
            sidebarOptions={[
                { path: "", label: "Lista de Incidentes/Accidentes"},
                { path: "", label: "Añadir Incidente/Accidente"},
            ]}
        >

        </ContentBoxComponent>
    );
};

export default WorkEventsView;