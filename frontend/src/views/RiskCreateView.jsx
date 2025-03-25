import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRiskFormReducer } from "../hooks/useRiskFormReducer";
import { useRiskOptions } from "../hooks/useRiskOptions";
import { useAuthUser } from "../hooks/useAuthUser";
import { useUserFormValidate } from "../hooks/useUserFormValidate";

import api from "../api/axiosConfig";

import SelectComponent from "../components/SelectComponent";
import InputComponent from "../components/InputComponent";
import ModalComponent from "../components/ModalComponent";
import ContentBoxComponent from "../components/ContentBoxComponent";

const RiskCreateView = () => {
    const [formData, dispatch] = useRiskFormReducer();
    const { probability, impacts, locations } = useRiskOptions();
    const [isRiskCreated, setIsRiskCreated] = useState(false);
    const { token, userRole, userId } = useAuthUser();
    const navigate = useNavigate();

    const formFields = [
        { label: "Fecha", type: "date", name: "date" },
        { label: "Probabilidad del riesgo", type: "select", name: "probability", options: probability },
        { label: "Ubicación", type: "select", name: "location", options: locations },
        { label: "Impacto del riesgo", type: "select", name: "impact", options: impacts },
        { label: "Descripción del riesgo", type: "text", name: "description", placeholder: "Descripción del riesgo", minLength: 3, maxLength: 50 },
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
            const riskDTO = {
                ...formData,
                userId: Number(userId),
            };

            api
                .post("/risks", riskDTO, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((response) => {
                    const token = response.data.token;
                    if (token) {
                        localStorage.setItem("authToken", token);
                    }
                    setIsRiskCreated(true);
                    dispatch({ type: "RESET_FORM" });
                })
                .catch((error) => {
                    console.error("Error al añadir el riesgo", error);
                });
        };
    }

    return (
        <ContentBoxComponent
            title={"AÑADIR RIESGO"}
            userRole={userRole}
            userId={userId}
            sidebarOptions={[
                ...(userRole === "ADMIN" ? [{ path: "/list-risks", label: "📋 Todos los riesgos" }] : []),
                { path: `/list-risks/${userId}`, label: "📋 Mis riesgos" },
                { path: "/create-risk", label: "➕ Añadir riesgos" }
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
                        onSubmit={onSubmit}
                    >
                        Añadir riesgo
                    </button>
                    </div>
                </div>
                <ModalComponent
                    isOpen={isRiskCreated}
                    title={"Riesgo añadido!"}
                    content={"El riesgo se ha añadido correctamente"}
                    onClose={() => {
                        setIsRiskCreated(false);
                        navigate(`/list-risks/${userId}`);
                    }}
                />
            </form>
        </ContentBoxComponent>
    );
};

export default RiskCreateView;