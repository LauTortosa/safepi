import { useEffect, useState } from "react";
import { followUpWorkStatusLabel } from "../utils/displayLabels";
import { useFollowUpFormReducer, useFollowUpOptions, useUserFormValidate, useAuthUser, useGeneratePdf } from "../hooks";
import { TableComponent, SelectComponent, InputComponent, ModalComponent } from "../components";
import api from "../api/axiosConfig";

const FollowUpView = ({ workEvent, workEventId }) => {
    const [formData, dispatch] = useFollowUpFormReducer();
    const { workStatus } = useFollowUpOptions();
    const { token, userRole } = useAuthUser();
    const [followUps, setFollowUps] = useState([]);
    const [isFollowUpCreated, setIsFollowUpCreated] = useState(false);
    const [isFollowUpDeleted, setIsFollowUpDeleted] = useState(false);

    const formFields = [
        { label: "Fecha", type: "date", name: "date", required: true },
        { label: "Estado", type: "select", name: "workStatus", options: workStatus, required: true },
        { label: "Diagnóstico", type: "text", name: "doctorNotes", required: true },
        { label: "Próximo seguimiento", type: "date", name: "nextCheckupDate", required: false },
        { label: "Comentarios", type: "text", name: "comments", required: false },
    ];

    const rows = followUps.map((followUp, index) => [
        index + 1,
        followUp.id,
        followUp.date,
        followUpWorkStatusLabel[followUp.workStatus],
        followUp.doctorNotes,
        followUp.nextCheckupDate,
        followUp.comments
    ]);

    const headers = ["#", "Id", "Fecha", "Estado", "Diagnóstico", "Próximo Seguimiento", "Comentarios"];

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
            workEventId: workEventId,
        }

        api.post("/followUps", requestData, {
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

    const { errors, setErrors, validateForm } = useUserFormValidate(formFields);

    useEffect(() => {
        if (token) {
            api.get(`/followUps/workEvent/${workEventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                    setFollowUps(response.data);
                })
                .catch((error) => {
                    console.error("WorkEvent no encontrado.", error);
                });
        }
    }, [workEventId, token]);

    const onDelete = (followUpId) => {
        if (token) {
            api.delete(`/followUps/${followUpId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(() => {
                    setFollowUps((prevFollowUps) => prevFollowUps.filter((followUps) => followUps.id !== followUpId));
                    setIsFollowUpDeleted(true);
                })
                .catch((error) => {
                    console.log("Error al eliminar el seguimiento", error);
                })
        } else {
            console.error("Token no encontrado");
        };
    };

    const onUpdate = () => { }

    if (!workStatus.length) {
        return <p>Cargando opciones...</p>;
    }

    return (
        <div className="p-6 w-full">
            {userRole === "ADMIN" && (
                <>
                    {/* Form FollowUp */}
                    <form onSubmit={onSubmit}>
                        <div className="bg-white shadow-md rounded-lg p-6 mb-8 border-l-4 border-blue-500">
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
                    </form>

                    <ModalComponent
                        isOpen={isFollowUpCreated}
                        title="Seguimiento creado!"
                        content="El seguimiento ha sido creado correctamente"
                        onClose={() => setIsFollowUpCreated(false)}
                    />
                    <ModalComponent
                        isOpen={isFollowUpDeleted}
                        title="Seguimiento eliminado!"
                        content="El seguimiento ha sido eliminado correctamente"
                        onClose={() => setIsFollowUpDeleted(false)}
                    />

                    {/* Tabla FollowUps */}
                    <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-500 ">
                        <TableComponent
                            headers={headers}
                            rows={rows}
                            userRole={userRole}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                    </div>
                </>
            )}
        </div>


    );
};

export default FollowUpView;
