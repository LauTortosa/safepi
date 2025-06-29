import { useState } from "react";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuthUser, useRiskOptions, useWorkEventOptions, useUserFormValidate, useWorkEventFormReducer } from "../../hooks";
import { ContentBoxComponent, ModalComponent, SelectComponent, InputComponent } from "../../components";

const WorkEventCreateView = () => {
    const [formData, dispatch] = useWorkEventFormReducer();
    const [isWorkEventCreated, setIsWorkEventCreated] = useState(false);
    const { categories, typeWorkEvents } = useWorkEventOptions();
    const { locations, impacts } = useRiskOptions();
    const { token, userRole, userId } = useAuthUser();
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

    const onInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_FIELD", field: name, value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validateForm(formData)) return;

        if (token && userId) {

            api.post("/workEvents", formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                    const token = response.data.token;
                    if (token) {
                        localStorage.setItem("authToken", token);
                    }
                    setIsWorkEventCreated(true);
                    dispatch({ type: "RESET_FORM " });
                })
                .catch((error) => {
                    console.error("Error al añadir el incidente/accidente", error);
                });
        };
    }
    return (
        <ContentBoxComponent
            title={"AÑADIR INCIDENTE/ACCIDENTE"}
            userRole={userRole}
            sidebarOptions={[
                { path: "/list-workevents", label: "Lista de Incidentes/Accidentes" },
                { path: "/create-workevent", label: "Añadir Incidente/Accidente" },
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
                                value={formData[field.name]}
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
                            Añadir Incidente/Accidente
                        </button>
                    </div>
                </div>
                <ModalComponent
                    isOpen={isWorkEventCreated}
                    title={"Incidente/Accidente añadido!"}
                    content={"El incidente/accidente se ha añadido correctamente"}
                    onClose={() => {
                        setIsWorkEventCreated(false);
                        navigate("/list-workEvents");
                    }}
                />
            </form>
        </ContentBoxComponent>
    );
};

export default WorkEventCreateView;