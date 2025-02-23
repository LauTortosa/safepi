import { useState } from "react";

export const useUserFormValidate = (formFields) => {
    const [errors, setErrors] = useState({});

    const validateForm = (formData) => {
        const newErrors = {};

        for (const field of formFields) {
            const value = formData[field.name];
        
            if (!value) {
                newErrors[field.name] = `El campo ${field.label} es requerido.`;
                break; 
            }
        
            if (field.minLength && value.length < field.minLength) {
                newErrors[field.name] = `${field.label} debe tener al menos ${field.minLength} caracteres.`;
                break;
            }
        
            if (field.maxLength && value.length > field.maxLength) {
                newErrors[field.name] = `${field.label} no puede tener más de ${field.maxLength} caracteres.`;
                break;
            }
        
            if (field.type === "email" && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
                newErrors[field.name] = "Por favor, introduce un correo electrónico válido.";
                break;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return { errors, setErrors, validateForm };
};