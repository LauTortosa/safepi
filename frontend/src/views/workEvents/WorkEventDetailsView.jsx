import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthUser, useGeneratePdf } from "../../hooks";
import { workEventCategoryLabel, workEventTypeWorkEventLabel, riskImpactLabel, riskLocationLabel, followUpWorkStatusLabel } from "../../utils/displayLabels";
import { ContentBoxComponent, WorkEventInfoComponent, FollowUpComponent } from "../../components";
import api from "../../api/axiosConfig";

const WorkEventDetailsView = () => {
    const { workEventId } = useParams();
    const { token, userRole, userId } = useAuthUser();
    const [workEvent, setWorkEvent] = useState(null);
    const { generatePDF } = useGeneratePdf();

    useEffect(() => {
        if (token) {
            api.get(`/workEvents/${workEventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                    setWorkEvent(response.data);

                    return api.get(`/followUps/workEvent/${workEventId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                })
                .then((followUpsResponse) => {
                    setWorkEvent(prev => ({
                        ...prev,
                        followUps: followUpsResponse.data
                    }));
                })
                .catch((error) => {
                    console.error("WorkEvent no encontrado.", error);
                });
        }
    }, [workEventId, token]);

    const onGeneratePDF = () => {
        const fileName = `workevent_${workEventId}.pdf`;

        const eventSection = {
            title: `Detalles del ${workEventCategoryLabel[workEvent.category]} - (${workEventId}) ${workEvent.name} ${workEvent.last_name}`,
            headers: ["Campo", "Valor"],
            rows: [
                ["Fecha", workEvent.date || "N/A"],
                ["Categoría", workEventCategoryLabel[workEvent.category] || "N/A"],
                ["Tipo", workEventTypeWorkEventLabel[workEvent.typeWorkEvent] || "N/A"],
                ["Descripción", workEvent.description || "N/A"],
                ["Testigos", workEvent.witnesses || "N/A"],
                ["Ubicación", riskLocationLabel[workEvent.location] || "N/A"],
                ["Impacto", riskImpactLabel[workEvent.impact] || "N/A"],
                ["Primeros auxilios", workEvent.firstAid || "N/A"],
            ]
        };

        const followUpsSection = {
            title: `Historial de Seguimientos - (${workEventId}) ${workEvent.name} ${workEvent.last_name}`,
            headers: ["Fecha", "Diagnóstico", "Estado", "Próximo seguimiento", "Comentario"],
            rows: Array.isArray(workEvent.followUps) && workEvent.followUps.length > 0
                ? workEvent.followUps.map(followUp => [
                    followUp.date || "Fecha desconocida",
                    followUp.doctorNotes || "Diagnóstico desconocido",
                    followUpWorkStatusLabel[followUp.workStatus] || "Estado desconocido",
                    followUp.nextCheckupDate || "Próximo seguimiento desconocido",
                    followUp.comments || "Sin comentarios",
                ])
                : [["Sin seguimientos", ""]]
        };

        generatePDF(fileName, [eventSection, followUpsSection]);
    };


    if (!workEvent) {
        return <p className="text-center">Cargando información...</p>;
    };

    return (
        <ContentBoxComponent
            title={`SEGUIMIENTO DEL ${workEventCategoryLabel[workEvent.category]}`}
            userRole={userRole}
            userId={userId}
            sidebarOptions={[
                ...(userRole === "ADMIN" ? [{ path: "/list-workEvents", label: "📋 Todos los incidentes/accidentes" }] : []),
                { path: `/workEvents/users/${userId}/workEvents`, label: "📋 Mis Incidentes/Accidentes" },
                ...(userRole === "ADMIN" ? [{ path: "/create-workEvent", label: "➕ Añadir Incidente/Accidente" }] : []),
            ]}
        >
            <WorkEventInfoComponent workEvent={workEvent} />
            <FollowUpComponent workEvent={workEvent} workEventId={workEventId} />
            <button
                onClick={onGeneratePDF}
                className="bg-blue-500 text-white mt-4 ml-6 px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                📄 Generar PDF
            </button>
        </ContentBoxComponent>
    );
};

export default WorkEventDetailsView;