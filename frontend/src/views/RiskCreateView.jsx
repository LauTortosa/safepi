import { useRiskFormReducer } from "../hooks/useRiskFormReducer";

import NavbarComponet from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import SelectComponent from "../components/SelectComponent";
import InputComponent from "../components/InputComponent";
import ModalComponent from "../components/ModalComponent";
import { useState } from "react";

const RiskCreateView = () => {
    const [formData, dispatch] = useRiskFormReducer();
    const [isRiskCreated, setIsRiskCreated] = useState(false);

    const formFields = [
        { label: "Fecha", type: "date", name: "date" },
        { label: "Ubicación", type: "select", name: "location" },
        { label: "Descripción del riesgo", type: "text", name: "description" },
        { label: "Probabilidad del riesgo", type: "select", name: "probability" },
        { label: "Impacto del riesgo", type: "select", name: "impact" },
    ];

    const onInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_FIELD", field: name, value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("authToken");

        if (token) {
            api.post("/risks", formData, { headers: { Authorization: `Bearer ${token}` }, 
            })
            .then((response) => {
                const token = response.data.token;
                if (token) {
                    localStorage.setItem("authToken", token);
                }
                setIsRiskCreated(true);
                dispatch({ type: "RESET_FORM"});
            })
            .catch((error) => {
                console.error("Error al añadir el riesgo", error);
            });
        };
    }

    return(
        <div>
            <NavbarComponet />
            <div className="min-h-screen max-w-auto bg-gray-100 flex flex-col pt-16 ml-60">
                <h1 className="text-3xl font-semibold text-center mb-6 pt-16 text-blue-900 w-full">
                    AÑADIR RIESGO
                </h1>

                <div className="flex">
                    <SidebarComponent 
                        options={[
                            { path: "/list-risks", label: "📋 Lista de riesgos"},
                            { path: "/create-risks", label: "➕ Añadir riesgos"},
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
                            >
                                Añadir riesgo
                            </button>
                            <ModalComponent 
                                isOpen={isRiskCreated}
                                title={"Riesgo añadido!"}
                                content={"El riesgo se ha añadido correctamente"}
                                onClose={() => setIsRiskCreated(false)}
                            />
                        </div>
                </form>
            </div>
        </div>
    </div>
    );
};

export default RiskCreateView;