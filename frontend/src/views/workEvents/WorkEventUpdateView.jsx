import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWorkEventFormReducer, useAuthUser, useRiskOptions, useWorkEventOptions, useUserFormValidate } from "../../hooks";
import { ContentBoxComponent, ModalComponent, SelectComponent, InputComponent } from "../../components";
import api from "../../api/axiosConfig";

const WorkEventUpdateView = () => {
    const [formData, dispatch] = useWorkEventFormReducer();
    const [isWorkEventUpdated, setIsWorkEventUpdated] = useState(false);
    const { categories, typeWorkEvents } = useWorkEventOptions();
    const { locations, impacts } = useRiskOptions();
    const { token, userRole, userId } = useAuthUser();
    const { workEventId } = useParams();
    const navigate = useNavigate();

    const formFields = [
        { label: "Categoria", type: "select", name: "category", options: categories },
        { label: "Fecha", type: "date", name: "date" },
        { label: "Descripción", type: "text", name: "description", placeholder: "Descripción" },
        { label: "Tipo de evento", type: "select", name: "typeWorkEvent", options: typeWorkEvents },
        { label: "Ubicación", type: "select", name: "location", options: locations },
        { label: "Id usuario afectado", type: "number", name: "userId" },
        { label: "Testigos", type: "text", name: "witnesses", placeholder: "Testigos" },
        { label: "Primeros auxilos", type: "text", name: "firstAid", placeholder: "Primeros auxilios" },
        { label: "Impacto", type: "select", name: "impact", options: impacts },
    ];

    const { errors, validateForm } = useUserFormValidate(formFields);

    useEffect(() => {
        if (token) {
            api.get(`/workEvents/${workEventId}`, { headers: { Authorization: `Bearer ${token}` } 
            })
            .then((response) => {
                dispatch({ type: "SET_FORM", payload: response.data });
            })
            .catch((error) => {
                console.error("Error al obtener los datos del accidente/incidente", error);
            });
        } else {
            console.error("Error al obtener el token");
        };
    }, [workEventId]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        dispatch ({ type: "SET_FIELD", field: name, value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validateForm(formData)) return;

        api.put(`/workEvents/${workEventId}`, formData, { headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            setIsWorkEventUpdated(true);
        })
        .catch((error) => {
            console.error("Error al actualizar el incidente/accidente", error);
        });
    };

    return(
        <ContentBoxComponent
            title={"MODIFICAR INCIDENTE/ACCIDENTE"}
            userRole={userRole}
            userId={userId}
            sidebarOptions={[
                ...(userRole === "ADMIN" ? [{ path: "/list-workEvents", label: "📋 Todos los incidentes/accidentes" }] : []),
                { path:  `/workEvents/users/${userId}/workEvents`, label: "📋 Mis incidentes/accidentes" },
                { path: "/create-workEvent", label: "➕ Añadir Incidente/Accidente" }
            ]}
        >
            <form
                onSubmit={onSubmit}
                className="flex-1 flex justify-center px-6"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
                    {formFields.map((field) =>
                        field.type === "select" ? (
                            <SelectComponent
                                key={field.name}
                                span={field.label}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={onInputChange}
                                options={field.options || []}
                                errorMessage={errors[field.name]}
                            />
                        ) : (
                            <InputComponent
                                key={field.name}
                                label={field.label}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name] || ""}
                                onChange={onInputChange}
                                placeholder={field.placeholder || ""}
                                errorMessage={errors[field.name]}
                            />
                        )
                    )}
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="mt-8 btn bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                        >
                            Actualizar Incidente/Accidente
                        </button>
                    </div>
                </div>
                <ModalComponent
                    isOpen={isWorkEventUpdated}
                    title={"Incidente/Accidente actualizado!"}
                    content={"El incidente/accidente se ha actualizado correctamente"}
                    onClose={() => {
                        setIsWorkEventUpdated(false);
                        navigate("/list-workEvents");
                    }}
                />
            </form>
        </ContentBoxComponent >
    );
};

export default WorkEventUpdateView;