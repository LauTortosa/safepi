import { useParams } from "react-router-dom";
import ContentBoxComponent from "../components/ContentBoxComponent";
import { useAuthUser } from "../hooks/useAuthUser";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import TableComponent from "../components/TableComponent";
import SelectComponent from "../components/SelectComponent";
import InputComponent from "../components/InputComponent";
import { useFollowUpOptions } from "../hooks/useFollowUpOptions";
import { useFollowUpFormReducer } from "../hooks/useFollowUpFormReducer";
import { useUserFormValidate } from "../hooks/useUserFormValidate";
import ModalComponent from "../components/ModalComponent";

const FollowUpView = () => {
    const { workEventId } = useParams();
    const [formData, dispatch] = useFollowUpFormReducer();
    const { workStatus } = useFollowUpOptions();
    const { token, userRole, userId } = useAuthUser();
    const [workEvent, setWorkEvent] = useState(null);
    const [followUps, setFollowUps] = useState([]);
    const [isFollowUpCreated, setIsFollowUpCreated] = useState(false);

    const formFields = [
        { label: "Fecha", type: "date", name: "date", required: true },
        { label: "Estado", type: "select", name: "workStatus", options: workStatus, required: true },
        { label: "Diagnóstico", type: "text", name: "doctorNotes", required: true },
        { label: "Próximo seguimiento", type: "date", name: "nextCheckupDate", required: false },
        { label: "Comentarios", type: "text", name: "comments", required: false },
    ];

    const rows = followUps.map((followUp, index) => [
        index + 1,
        followUp.date,
        followUp.workStatus,
        followUp.doctorNotes,
        followUp.nextCheckupDate,
        followUp.comments
    ]);

    const { errors, setErrors, validateForm } = useUserFormValidate(formFields);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_FIELD", field: name, value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validateForm(formData)) return;

        const requestData = {
            ...formData,
            userId: workEvent.userId,
            workEventId:workEventId,
        }

        api
            .post("/followUps", requestData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                setIsFollowUpCreated(true);
                dispatch({ type: "RESET_FORM" });
                setFollowUps((prevFollowUps) => [...prevFollowUps, response.data]);
            })
            .catch((error) => {
                setErrors({ general: error.response?.data?.message || "Error al crear el seguimiento." });
            });
    };

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
                .then((response) => {
                    setFollowUps(response.data);
                })
                .catch((error) => {
                    console.error("WorkEvent no encontrado.", error);
                });
        }
    }, [workEventId, token]);

    if (!workEvent) {
        return <p className="text-center">Cargando información del incidente/accidente...</p>;
    }

    if (!workStatus.length) {
        return <p>Cargando opciones...</p>;
    }

    return (
        <ContentBoxComponent
            title={`SEGUIMIENTO DEL "${workEvent.category}"`}
            userRole={userRole}
            userId={userId}
            sidebarOptions={[
                ...(userRole === "ADMIN" ? [{ path: "/list-workEvents", label: "📋 Todos los incidentes/accidentes" }] : []),
                { path: `/list-workEvents/${userId}`, label: "📋 Mis incidentes/accidentes" },
                { path: "/create-workEvent", label: "➕ Añadir Incidente/Accidente" }
            ]}
        >
            <div className="p-6 w-full">
                {/* Información workEvent */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border-l-4 border-blue-500 max-w-7xl mx-auto">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                        {workEvent.name} {workEvent.last_name}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <p><strong>📅 Fecha:</strong> {workEvent.date}</p>
                        <p><strong>📂 Categoría:</strong> {workEvent.category}</p>
                        <p><strong>📌 Tipo:</strong> {workEvent.typeWorkEvent}</p>
                        <p><strong>⚠️ Impacto:</strong> {workEvent.impact}</p>
                        <p><strong>📝 Descripción:</strong> {workEvent.description}</p>
                        <p><strong>📍 Ubicación:</strong> {workEvent.location}</p>
                        <p><strong>👀 Testigos:</strong> {workEvent.witnesses || "No especificado"}</p>
                        <p><strong>⛑️ Primeros auxilios:</strong> {workEvent.firstAid || "No aplicado"}</p>
                    </div>
                </div>

                {/* Form FollowUp */}
                <form onSubmit={onSubmit}>
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6 border-l-4 border-blue-500">
                        <h3 className="text-xl font-semibold text-gray-600 mb-4">Añadir Nuevo Seguimiento</h3>

                        <div className="grid grid-cols-2 gap-4">
                            {formFields.map((field) =>
                                field.type === "select" ? (
                                    <SelectComponent
                                        key={field.name}
                                        span={field.label}
                                        name={field.name}
                                        value={formData[field.name] || ""}
                                        onChange={onInputChange}
                                        options={field.options || []}
                                        errorMessage={errors[field.name]}
                                    />
                                ) : (
                                    <InputComponent
                                        key={field.name}
                                        label={field.label}
                                        type={field.type}
                                        value={formData[field.name] || ""}
                                        id={field.name}
                                        name={field.name}
                                        onChange={onInputChange}
                                        placeholder={field.placeholder || ""}
                                        errorMessage={errors[field.name]}
                                    />
                                )
                            )}
                        </div>
                        <button
                            type="submit"
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            ➕ Añadir Seguimiento
                        </button>
                    </div>
                    <ModalComponent 
                        isOpen={isFollowUpCreated}
                        title="Seguimiento creado!"
                        content="El seguimiento ha sido creado correctamente"
                        onClose={() => setIsFollowUpCreated(false)}
                    />
                </form>
            </div>

            {/* Tabla FollowUps */}
            <div className="bg-white shadow-md rounded-lg p-6 ml-6 border-l-4 border-blue-500 ">
                <TableComponent
                    headers={["#", "Fecha", "Estado", "Diagnóstico", "Próximo Seguimiento", "Comentarios"]}
                    rows={rows}
                    userRole={userRole}
                />
            </div>
        </ContentBoxComponent >
    );
};

export default FollowUpView;
