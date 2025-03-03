import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRiskFormReducer } from "../hooks/useRiskFormReducer";
import { useRiskOptions } from "../hooks/useRiskOptions";
import { useAuthUser } from "../hooks/useAuthUser";
import { useUserFormValidate } from "../hooks/useUserFormValidate";
import api from "../api/axiosConfig";

import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import InputComponent from "../components/InputComponent";
import SelectComponent from "../components/SelectComponent";
import ModalComponent from "../components/ModalComponent";

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
            api.get(`/risks/${riskId}`, { headers: { Authorization: `Bearer ${token}` }
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

        api.put(`/risks/${riskId}`, formData, { headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            setIsRiskUpdated(true);
        })
        .catch((error) => {
            console.error("Error al actualizar el riesgo", error);
        });
    };

    return (
         <div>
            <NavbarComponent />
            <div className="min-h-screen max-w-auto bg-gray-100 flex flex-col pt-16 ml-40">
                <h1 className="text-3xl font-semibold text-center mb-6 pt-16 text-blue-900 w-full">
                    MODIFICAR RIESGO
                </h1>

                <div className="flex">
                    <SidebarComponent
                        options={[
                            ...(userRole === "ADMIN" ? [{ path: "/list-risks", label: "📋 Todos los riesgos" }] : []),
                            { path: `/list-risks/${userId}`, label: "📋 Mis riesgos" },
                            { path: "/create-risks", label: "➕ Añadir riesgos" }
                        ]}
                    />

                    <form
                        onSubmit={handleSubmit}
                        className="flex-1 flex justify-center px-6 ml-40"
                    >
                        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mb-10">
                            <div>
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
                            </div>
                            <button
                                type="submit"
                                className="mt-8 btn bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                            >
                                Actualizar riesgo
                            </button>
                            <ModalComponent
                                isOpen={isRiskUpdated}
                                title={"Riesgo actualizado!"}
                                content={"El riesgo se ha acrualizado correctamente"}
                                onClose={() => {
                                    setIsRiskUpdated(false);
                                    navigate("/list-risks");
                                }}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RiskUpdateView;