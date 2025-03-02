import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRiskFormReducer } from "../hooks/useRiskFormReducer";
import { useRiskOptions } from "../hooks/useRiskOptions";
import { useAuthUser } from "../hooks/useAuthUser";

import api from "../api/axiosConfig";

import NavbarComponet from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import SelectComponent from "../components/SelectComponent";
import InputComponent from "../components/InputComponent";
import ModalComponent from "../components/ModalComponent";

const RiskCreateView = () => {
    const [formData, dispatch] = useRiskFormReducer();
    const { probability, impacts, locations } = useRiskOptions();
    const [isRiskCreated, setIsRiskCreated] = useState(false);
    const { token, userRole, userId } = useAuthUser();
    const navigate = useNavigate();

    const formFields = [
        { label: "Fecha", type: "date", name: "date" },
        { label: "Ubicación", type: "select", name: "location", options: locations },
        { label: "Descripción del riesgo", type: "text", name: "description", placeholder: "Descripción del riesgo", minLength: 3, maxLength: 25 },
        { label: "Probabilidad del riesgo", type: "select", name: "probability", options: probability },
        { label: "Impacto del riesgo", type: "select", name: "impact", options: impacts },
    ];

    const onInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_FIELD", field: name, value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (token && userId) {
            const riskDTO = {
                ...formData,
                userId: Number(userId),
            };

            api.post("/risks", riskDTO, {
                headers: { Authorization: `Bearer ${token}` },
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
        <div>
            <NavbarComponet />
            <div className="min-h-screen max-w-auto bg-gray-100 flex flex-col pt-16 ml-40">
                <h1 className="text-3xl font-semibold text-center mb-6 pt-16 text-blue-900 w-full">
                    AÑADIR RIESGO
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
                        onSubmit={onSubmit}
                        className="flex-1 flex justify-center px-6"
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
                                        //errorMessage={errors[field.name]}
                                        />
                                    )
                                )}
                            </div>
                            <button
                                type="submit"
                                className="mt-8 btn bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                                onSubmit={onSubmit}
                            >
                                Añadir riesgo
                            </button>
                            <ModalComponent
                                isOpen={isRiskCreated}
                                title={"Riesgo añadido!"}
                                content={"El riesgo se ha añadido correctamente"}
                                onClose={() => {
                                    setIsRiskCreated(false);
                                    navigate(`/list-risks/${userId}`);
                                }}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RiskCreateView;