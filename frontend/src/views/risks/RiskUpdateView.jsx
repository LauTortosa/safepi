import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRiskFormReducer, useRiskOptions, useAuthUser, useUserFormValidate } from "../../hooks";
import { InputComponent, SelectComponent, ModalComponent, ContentBoxComponent } from "../../components";
import api from "../../api/axiosConfig";

const RiskUpdateView = () => {
    const [isRiskUpdated, setIsRiskUpdated] = useState(false);
    const [formData, dispatch] = useRiskFormReducer();
    const { probability, impacts, locations, states } = useRiskOptions();
    const { token, userRole, userId } = useAuthUser();
    const { riskId } = useParams();
    const navigate = useNavigate();

    const formFields = [
        { label: "Fecha", type: "date", name: "date" },
        { label: "Ubicación", type: "select", name: "location", options: locations },
        { label: "Descripción del riesgo", type: "text", name: "description", placeholder: "Descripción del riesgo", minLength: 3, maxLength: 25 },
        { label: "Probabilidad del riesgo", type: "select", name: "probability", options: probability },
        { label: "Impacto del riesgo", type: "select", name: "impact", options: impacts },
        { label: "Evaluación", type: "select", name: "state", options: states },
    ];

    const { errors, validateForm } = useUserFormValidate(formFields);

    useEffect(() => {
        if (token) {
            api.get(`/risks/${riskId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                    dispatch({ type: "SET_FORM", payload: response.data });
                })
                .catch((error) => {
                    console.error("Error al obtener datos del riesgo", error);
                });
        } else {
            console.error("Error al obtener el token");
        };
    }, [riskId]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_FIELD", field: name, value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm(formData)) return;

        api.put(`/risks/${riskId}`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setIsRiskUpdated(true);
            })
            .catch((error) => {
                console.error("Error al actualizar el riesgo", error);
            });
    };

    return (
        <ContentBoxComponent
            title={"MODIFICAR RIESGO"}
            userRole={userRole}
            userId={userId}
            sidebarOptions={[
                ...(userRole === "ADMIN" ? [{ path: "/list-risks", label: "📋 Todos los riesgos" }] : []),
                { path: `/list-risks/${userId}`, label: "📋 Mis riesgos" },
                { path: "/create-risk", label: "➕ Añadir riesgos" }
            ]}
        >
            <form
                onSubmit={handleSubmit}
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
                            Actualizar riesgo
                        </button>
                    </div>
                </div>
                <ModalComponent
                    isOpen={isRiskUpdated}
                    title={"Riesgo actualizado!"}
                    content={"El riesgo se ha actualizado correctamente"}
                    onClose={() => {
                        setIsRiskUpdated(false);
                        navigate("/list-risks");
                    }}
                />
            </form>
        </ContentBoxComponent >
    );
};

export default RiskUpdateView;